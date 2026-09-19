import { Schema, model, models } from "mongoose";

const RateLimitSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    blockedUntil: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true },
);

RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit = models.RateLimit || model("RateLimit", RateLimitSchema);

type RateLimitRule = {
  limit: number;
  windowMs: number;
};

export const RATE_LIMITS = {
  login: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  },

  register: {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },

  forgotPassword: {
    limit: 3,
    windowMs: 15 * 60 * 1000,
  },

  resetPassword: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  },

  changePassword: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  },

  coupon: {
    limit: 20,
    windowMs: 15 * 60 * 1000,
  },

  order: {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  },

  general: {
    limit: 60,
    windowMs: 15 * 60 * 1000,
  },
} satisfies Record<string, RateLimitRule>;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function getRetryAfterSeconds(expiresAt: Date) {
  return Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));
}

/* -------------------------------------------------------------------------- */
/* Normal Rate Limiter                                                        */
/* -------------------------------------------------------------------------- */

export async function rateLimit(
  request: Request,
  action: keyof typeof RATE_LIMITS,
  identifier?: string,
) {
  const rule = RATE_LIMITS[action];

  const ip = getClientIp(request);

  const extraIdentifier = identifier ? identifier.trim().toLowerCase() : "";

  const key = extraIdentifier
    ? `rate:${action}:${ip}:${extraIdentifier}`
    : `rate:${action}:${ip}`;

  const now = new Date();

  let record = await RateLimit.findOne({ key });

  if (!record) {
    await RateLimit.create({
      key,
      count: 1,
      expiresAt: new Date(Date.now() + rule.windowMs),
    });

    return {
      allowed: true,
      remaining: Math.max(0, rule.limit - 1),
      retryAfterSeconds: 0,
    };
  }

  if (record.expiresAt.getTime() <= now.getTime()) {
    record.count = 1;

    record.expiresAt = new Date(Date.now() + rule.windowMs);

    record.blockedUntil = undefined;

    await record.save();

    return {
      allowed: true,
      remaining: Math.max(0, rule.limit - 1),
      retryAfterSeconds: 0,
    };
  }

  if (record.count >= rule.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: getRetryAfterSeconds(record.expiresAt),
    };
  }

  record.count += 1;

  await record.save();

  return {
    allowed: true,
    remaining: Math.max(0, rule.limit - record.count),
    retryAfterSeconds: 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Successful Login Protection                                                */
/*                                                                            */
/* 3 successful logins within 5 minutes                                      */
/* → 4th login is blocked for 15 minutes                                     */
/* -------------------------------------------------------------------------- */

const SUCCESSFUL_LOGIN_LIMIT = 3;
const SUCCESSFUL_LOGIN_WINDOW_MS = 5 * 60 * 1000;
const SUCCESSFUL_LOGIN_BLOCK_MS = 15 * 60 * 1000;

export async function checkSuccessfulLoginLimit(
  request: Request,
  identifier: string,
) {
  const ip = getClientIp(request);

  const cleanIdentifier = identifier.trim().toLowerCase();

  const key = `rate:login-success:${ip}:${cleanIdentifier}`;

  const now = new Date();

  let record = await RateLimit.findOne({ key });

  /* First successful login */
  if (!record) {
    await RateLimit.create({
      key,
      count: 1,
      expiresAt: new Date(Date.now() + SUCCESSFUL_LOGIN_WINDOW_MS),
    });

    return {
      allowed: true,
      remaining: SUCCESSFUL_LOGIN_LIMIT - 1,
      retryAfterSeconds: 0,
    };
  }

  /* Currently blocked */
  if (record.blockedUntil && record.blockedUntil.getTime() > now.getTime()) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((record.blockedUntil.getTime() - Date.now()) / 1000),
      ),
    };
  }

  /* 15-minute block has expired */
  if (record.blockedUntil && record.blockedUntil.getTime() <= now.getTime()) {
    record.count = 1;

    record.expiresAt = new Date(Date.now() + SUCCESSFUL_LOGIN_WINDOW_MS);

    record.blockedUntil = undefined;

    await record.save();

    return {
      allowed: true,
      remaining: SUCCESSFUL_LOGIN_LIMIT - 1,
      retryAfterSeconds: 0,
    };
  }

  /* 5-minute window has expired */
  if (record.expiresAt.getTime() <= now.getTime()) {
    record.count = 1;

    record.expiresAt = new Date(Date.now() + SUCCESSFUL_LOGIN_WINDOW_MS);

    record.blockedUntil = undefined;

    await record.save();

    return {
      allowed: true,
      remaining: SUCCESSFUL_LOGIN_LIMIT - 1,
      retryAfterSeconds: 0,
    };
  }

  /*
   * Already 3 successful logins
   * within the current 5-minute window.
   *
   * Block for 15 minutes.
   */
  if (record.count >= SUCCESSFUL_LOGIN_LIMIT) {
    record.blockedUntil = new Date(Date.now() + SUCCESSFUL_LOGIN_BLOCK_MS);

    await record.save();

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(SUCCESSFUL_LOGIN_BLOCK_MS / 1000),
    };
  }

  /* Count another successful login */
  record.count += 1;

  await record.save();

  return {
    allowed: true,
    remaining: SUCCESSFUL_LOGIN_LIMIT - record.count,
    retryAfterSeconds: 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Reset Normal Rate Limit                                                    */
/* -------------------------------------------------------------------------- */

export async function resetRateLimit(
  request: Request,
  action: keyof typeof RATE_LIMITS,
  identifier?: string,
) {
  const ip = getClientIp(request);

  const extraIdentifier = identifier ? identifier.trim().toLowerCase() : "";

  const key = extraIdentifier
    ? `rate:${action}:${ip}:${extraIdentifier}`
    : `rate:${action}:${ip}`;

  await RateLimit.deleteOne({ key });
}

/* -------------------------------------------------------------------------- */
/* Normal Rate Limit Response                                                 */
/* -------------------------------------------------------------------------- */

export function rateLimitResponse(retryAfterSeconds: number) {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Too many requests. Please try again later.",
      retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Successful Login Block Response                                            */
/* -------------------------------------------------------------------------- */

export function successfulLoginLimitResponse(retryAfterSeconds: number) {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
      retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

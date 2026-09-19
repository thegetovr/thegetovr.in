export const EMAIL_CONFIG = {
  ORDER_PLACED: true,
  ORDER_DELIVERED: true,

  LOGIN_ALERT: true,

  FORGOT_PASSWORD: true,
  PASSWORD_CHANGED: true,

  ACCOUNT_DELETED: true,
  REGISTRATION_WELCOME: true,
} as const;

export type EmailType = keyof typeof EMAIL_CONFIG;

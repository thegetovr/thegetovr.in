"use client";

import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TOKEN CHECK
    if (!token) {
      setNotificationType("error");
      setNotification("Invalid or missing reset link.");

      setTimeout(() => {
        setNotification("");
      }, 3000);

      return;
    }

    // PASSWORD VALIDATION
    if (!password || !confirmPassword) {
      setNotificationType("error");
      setNotification("Please enter both passwords.");

      setTimeout(() => {
        setNotification("");
      }, 2000);

      return;
    }

    // PASSWORD MATCH
    if (password !== confirmPassword) {
      setNotificationType("error");
      setNotification("Passwords do not match.");

      setTimeout(() => {
        setNotification("");
      }, 2000);

      return;
    }

    // PASSWORD LENGTH
    if (password.length < 8) {
      setNotificationType("error");
      setNotification("Password must be at least 8 characters.");

      setTimeout(() => {
        setNotification("");
      }, 2000);

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNotificationType("success");
        setNotification(result.message);

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        setNotificationType("error");
        setNotification(result.message);

        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);

      setNotificationType("error");
      setNotification("Something went wrong.");

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ==================== NOTIFICATION ==================== */}

      {notification && (
        <div
          className={`
      fixed
      left-5
      right-5
      top-[105px]
      z-[100]
      flex
      items-start
      gap-3
      rounded-2xl
      border
      bg-white
      px-4
      py-3.5
      shadow-2xl

      sm:left-auto
      sm:right-6
      sm:top-24
      sm:max-w-md
      sm:items-center
      sm:rounded-xl
      sm:px-5
      sm:py-4

      ${
        notificationType === "success"
          ? "border-green-200 text-green-600"
          : "border-red-200 text-red-600"
      }
    `}
        >
          {/* Notification Icon */}
          <span className="mt-0.5 shrink-0 text-lg sm:mt-0 sm:text-xl">
            {notificationType === "success" ? "✓" : "!"}
          </span>

          {/* Notification Message */}
          <p className="min-w-0 flex-1 break-words text-sm font-medium leading-5">
            {notification}
          </p>
        </div>
      )}
      {/* ==================== PAGE ==================== */}

      <main
        className="
          flex
          min-h-[calc(100dvh-80px)]
          items-start
          justify-center
          bg-[#fcfbf9]
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:items-center
          lg:px-8
        "
      >
        <div className="mx-auto w-full max-w-5xl">
          <section
            className="
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-[#ddd5ca]
              bg-white
              shadow-2xl
              sm:rounded-[24px]
              lg:rounded-[32px]
            "
          >
            <div className="flex flex-col lg:flex-row">
              {/* ==================== IMAGE ==================== */}

              <div
                className="
                  relative
                  h-40
                  w-full
                  overflow-hidden
                  border-b
                  border-[#ddd5ca]
                  sm:h-52
                  lg:h-[520px]
                  lg:w-[45%]
                  lg:border-b-0
                  lg:border-r
                "
              >
                <Image
                  src="/images/user/LoginBanner2.png"
                  alt="The GetOvr Reset Password"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={70}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* ==================== FORM SECTION ==================== */}

              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  bg-[#fcfaf7]
                  p-5
                  text-zinc-900
                  sm:p-6
                  lg:w-[55%]
                  lg:p-10
                "
              >
                <div className="w-full max-w-lg">
                  {/* LABEL */}

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[#a67c35]
                      sm:tracking-[0.3em]
                    "
                  >
                    ACCOUNT SECURITY
                  </p>

                  {/* HEADING */}

                  <h1
                    className="
                      mt-3
                      text-3xl
                      font-bold
                      leading-[1.1]
                      text-zinc-900
                      sm:text-4xl
                    "
                  >
                    Reset Your
                    <br />
                    <span className="text-[#a67c35]">Password</span>
                  </h1>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-4
                      max-w-md
                      text-sm
                      leading-6
                      text-[#77736d]
                      sm:leading-7
                    "
                  >
                    Create a new password for your account.
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    Make sure it is at least 8 characters long.
                  </p>

                  {/* ==================== FORM ==================== */}

                  <form onSubmit={handleSubmit}>
                    {/* NEW PASSWORD */}

                    <div className="group relative mt-5 sm:mt-6">
                      <Lock
                        size={20}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-[#9a958d]
                          transition-all
                          duration-300
                          group-focus-within:scale-110
                          group-focus-within:text-[#a67c35]
                        "
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="
                          peer
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-[#d5cec3]
                          bg-[#fcfaf7]
                          pl-12
                          pr-12
                          text-zinc-900
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#a67c35]
                          focus:ring-1
                          focus:ring-[#a67c35]/20
                          sm:h-14
                        "
                      />

                      <label
                        htmlFor="password"
                        className="
                          absolute
                          left-10
                          top-1/2
                          -translate-y-1/2
                          bg-[#fcfaf7]
                          px-2
                          text-sm
                          text-[#77736d]
                          transition-all
                          duration-300
                          peer-focus:left-9
                          peer-focus:top-0
                          peer-focus:text-xs
                          peer-focus:text-[#a67c35]
                          peer-not-placeholder-shown:top-0
                          peer-not-placeholder-shown:text-xs
                          peer-not-placeholder-shown:text-[#a67c35]
                        "
                      >
                        New Password
                      </label>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          p-1
                          text-[#9a958d]
                          transition-colors
                          hover:text-[#a67c35]
                        "
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="group relative mt-5">
                      <Lock
                        size={20}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-[#9a958d]
                          transition-all
                          duration-300
                          group-focus-within:scale-110
                          group-focus-within:text-[#a67c35]
                        "
                      />

                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="
                          peer
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-[#d5cec3]
                          bg-[#fcfaf7]
                          pl-12
                          pr-12
                          text-zinc-900
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#a67c35]
                          focus:ring-1
                          focus:ring-[#a67c35]/20
                          sm:h-14
                        "
                      />

                      <label
                        htmlFor="confirmPassword"
                        className="
                          absolute
                          left-10
                          top-1/2
                          -translate-y-1/2
                          bg-[#fcfaf7]
                          px-2
                          text-sm
                          text-[#77736d]
                          transition-all
                          duration-300
                          peer-focus:left-9
                          peer-focus:top-0
                          peer-focus:text-xs
                          peer-focus:text-[#a67c35]
                          peer-not-placeholder-shown:top-0
                          peer-not-placeholder-shown:text-xs
                          peer-not-placeholder-shown:text-[#a67c35]
                        "
                      >
                        Confirm Password
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          p-1
                          text-[#9a958d]
                          transition-colors
                          hover:text-[#a67c35]
                        "
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* RESET BUTTON */}

                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="
                          group
                          grid
                          h-13
                          w-full
                          grid-cols-[1fr_auto_1fr]
                          items-center
                          rounded-xl
                          border
                          border-[#d5c7b4]
                          bg-[#eee3d5]
                          px-4
                          text-zinc-900
                          transition-all
                          duration-300
                          hover:border-[#cdbb9f]
                          hover:bg-[#e6d8c6]
                          active:scale-[0.98]
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          sm:h-14
                          sm:rounded-2xl
                          sm:px-6
                        "
                      >
                        <div />

                        <span
                          className="
                            justify-self-center
                            text-sm
                            font-semibold
                            transition-all
                            duration-300
                            group-hover:scale-105
                            sm:text-base
                          "
                        >
                          {loading ? "RESETTING..." : "RESET PASSWORD"}
                        </span>

                        <ArrowRight
                          size={20}
                          className="
                            justify-self-end
                            text-[#8f6a2e]
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </button>
                    </div>
                  </form>

                  {/* BACK TO LOGIN */}

                  <div className="mt-6 text-center sm:mt-8">
                    <Link
                      href="/login"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[#a67c35]
                        transition-all
                        duration-300
                        hover:text-[#8f6a2e]
                      "
                    >
                      <ArrowLeft size={16} />
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

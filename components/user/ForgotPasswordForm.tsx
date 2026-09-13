"use client";

import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setNotificationType("error");
      setNotification("Please enter your email address.");

      setTimeout(() => {
        setNotification("");
      }, 2000);

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNotificationType("success");
        setNotification(result.message);

        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        setNotificationType("error");
        setNotification(result.message);

        setTimeout(() => {
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);

      setNotificationType("error");
      setNotification("Something went wrong.");

      setTimeout(() => {
        setNotification("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div
          className={`
            fixed
            left-4
            right-4
            top-20
            z-[100]
            flex
            items-start
            gap-3
            rounded-xl
            border
            bg-white
            px-4
            py-3
            shadow-2xl
            sm:left-auto
            sm:right-6
            sm:top-24
            sm:max-w-md
            sm:items-center
            sm:px-5
            sm:py-4
            ${
              notificationType === "success"
                ? "border-green-200 text-green-600"
                : "border-red-200 text-red-600"
            }
          `}
        >
          <span className="shrink-0 text-xl">
            {notificationType === "success" ? "✓" : "!"}
          </span>

          <p className="min-w-0 flex-1 text-sm font-medium leading-5">
            {notification}
          </p>
        </div>
      )}

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
              {/* Banner */}
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
                  alt="The GetOvr Forgot Password"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={70}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Form Section */}
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
                  {/* Recovery Label */}
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
                    ACCOUNT RECOVERY
                  </p>

                  {/* Heading */}
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
                    Forgot Your
                    <br />
                    <span className="text-[#a67c35]">Password?</span>
                  </h1>

                  {/* Description */}
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
                    Enter your registered email address and we&apos;ll send you
                    a link to reset your password.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="group relative mt-5 sm:mt-6">
                      <Mail
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
                        id="email"
                        type="email"
                        name="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="
                          peer
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-[#d5cec3]
                          bg-[#fcfaf7]
                          pl-12
                          pr-4
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
                        htmlFor="email"
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
                        Email Address
                      </label>
                    </div>

                    {/* Send Reset Link Button */}
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
                          {loading ? "SENDING..." : "SEND RESET LINK"}
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

                  {/* Back to Login */}
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

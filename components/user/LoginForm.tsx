"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const [notification, setNotification] = useState("");

  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const passwordRef = useRef<HTMLInputElement>(null);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();


      if (result.success) {
        const message = "Login Successful";

        // Show immediately
        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
        );

        // =============================================
        // REDIRECT AFTER LOGIN
        // =============================================

        const redirect = searchParams.get("redirect");

        // Only allow internal redirects
        if (redirect && redirect.startsWith("/")) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        setNotificationType("error");
        setNotification(result.message);

        setTimeout(() => {
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      console.error("Login Error:", error);

      setNotificationType("error");
      setNotification("Something went wrong");

      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  return (
    <>
      {/* =================================================
          ERROR NOTIFICATION
      ================================================= */}

      {notification && notificationType === "error" && (
        <div
          className="
          fixed
          right-6
          top-24
          z-[100]
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-red-200
          bg-white
          px-5
          py-4
          text-red-600
          shadow-2xl
          "
        >
          <span className="text-xl">!</span>

          <p className="min-w-0 flex-1 text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className="
            flex
            min-h-[calc(100dvh-80px)]
            items-start
            justify-center
            bg-[#fcfbf9]
            px-6
            py-8
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
            max-w-5xl
            overflow-hidden
            rounded-[24px]
            border
            border-[#ddd5ca]
            bg-white
            shadow-2xl
            sm:rounded-[28px]
            lg:max-h-[calc(100dvh-140px)]
            lg:rounded-[32px]
  "
          >
            <div className="flex flex-col lg:flex-row">
              {/* =================================================
                  LEFT SIDE - IMAGE
              ================================================= */}

              <div
                className="
                relative
                h-40
                w-full
                overflow-hidden
                border-b
                border-[#ddd5ca]
                sm:h-52
                lg:h-auto
                lg:w-[45%]
                lg:border-b-0
                lg:border-r
              "
              >
                <Image
                  src="/images/user/LoginBanner2.png"
                  alt="The GetOvr Login"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={70}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* =================================================
                  RIGHT SIDE - FORM
              ================================================= */}

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
                lg:p-8
              "
              >
                <div className="w-full max-w-lg">
                  {/* Welcome Text */}

                  <p
                    className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#a67c35]
                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                  >
                    Welcome Back
                  </p>

                  {/* Heading */}

                  <h1
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    leading-[1.1]
                    text-zinc-900
                    sm:mt-3
                    sm:text-4xl
                  "
                  >
                    Log in to <br />
                    <span className="text-[#a67c35]">The GetOvr</span>
                  </h1>

                  {/* Description */}

                  <p
                    className="
                    mt-3
                    text-sm
                    leading-6
                    text-[#77736d]
                    sm:leading-7
                  "
                  >
                    Access your account and continue
                    <br />
                    Designing your style
                  </p>

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form onSubmit={handleSubmit}>
                    {/* =================================================
                        EMAIL / PHONE
                    ================================================= */}

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
                        id="identifier"
                        type="text"
                        placeholder=" "
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                        peer
                        h-13
                        w-full
                        rounded-xl
                        border
                        border-[#d5cec3]
                        bg-[#fcfaf7]
                        pl-12
                        pr-14
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
                        htmlFor="identifier"
                        className="
                          absolute
                          left-4
                          top-1/2
                          ml-6
                          -translate-y-1/2
                          bg-[#fcfaf7]
                          px-2
                          text-base
                          text-[#77736d]
                          transition-all
                          duration-300
                          peer-focus:left-3
                          peer-focus:top-0
                          peer-focus:text-sm
                          peer-focus:text-[#a67c35]
                          peer-not-placeholder-shown:top-0
                          peer-not-placeholder-shown:text-sm
                          peer-not-placeholder-shown:text-[#a67c35]
                        "
                      >
                        Email or Phone Number
                      </label>
                    </div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

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
                        ref={passwordRef}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=" "
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="
                          peer
                          h-14
                          w-full
                          rounded-2xl
                          border
                          border-[#d5cec3]
                          bg-[#fcfaf7]
                          pl-12
                          pr-14
                          text-[#181715]
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#a67c35]
                          focus:ring-1
                          focus:ring-[#a67c35]/20
                        "
                      />

                      <label
                        htmlFor="password"
                        className="
                          absolute
                          left-4
                          top-1/2
                          ml-6
                          -translate-y-1/2
                          bg-[#fcfaf7]
                          px-2
                          text-base
                          text-[#77736d]
                          transition-all
                          duration-300
                          peer-focus:left-3
                          peer-focus:top-0
                          peer-focus:text-sm
                          peer-focus:text-[#a67c35]
                          peer-not-placeholder-shown:top-0
                          peer-not-placeholder-shown:text-sm
                          peer-not-placeholder-shown:text-[#a67c35]
                        "
                      >
                        Password
                      </label>

                      {/* Show Password */}

                      <button
                        type="button"
                        onClick={() => {
                          setShowPassword((prev) => !prev);

                          requestAnimationFrame(() => {
                            if (passwordRef.current) {
                              passwordRef.current.focus();

                              const length = passwordRef.current.value.length;

                              passwordRef.current.setSelectionRange(
                                length,
                                length,
                              );
                            }
                          });
                        }}
                        className="
                          absolute
                          right-5
                          top-1/2
                          -translate-y-1/2
                          text-[#9a958d]
                          transition-all
                          duration-300
                          hover:scale-110
                          hover:text-[#181715]
                          active:scale-95
                        "
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* =================================================
                        FORGOT PASSWORD
                    ================================================= */}

                    <div className="mt-3 flex justify-end sm:mt-4">
                      <Link
                        href="/forgot-password"
                        className="
                      text-sm
                      font-medium
                      text-[#756d60]
                      underline-offset-4
                      transition-all
                      duration-300
                      hover:text-[#a67c35]
                      hover:underline
                    "
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        className="
                          group
                          grid
                          h-13
                          w-full
                          grid-cols-[1fr_auto_1fr]
                          items-center
                          rounded-2xl
                          border
                          border-[#d5c7b4]
                          bg-[#eee3d5]
                          px-4
                          text-zinc-900
                          transition-all
                          duration-300
                          hover:bg-[#e6d8c6]
                          hover:border-[#cdbb9f]
                          active:scale-[0.98]
                          sm:h-14
                          sm:px-6
                        "
                      >
                        <div />

                        <span
                          className="
                            justify-self-center
                            text-md
                            font-semibold
                            transition-all
                            duration-300
                            group-hover:scale-110
                          "
                        >
                          LOG IN
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

                  {/* =================================================
                      REGISTER
                  ================================================= */}

                  <div className="mt-4 text-center sm:mt-5">
                    <p className="text-sm leading-6 text-[#77736d]">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="
                          font-semibold
                         text-[#a67c35]
                          transition-colors
                          duration-300
                          hover:text-[#8f6a2e]
                        "
                      >
                        Register Here
                      </Link>
                    </p>
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

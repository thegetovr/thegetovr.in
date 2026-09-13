"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // =====================================================
  // CONSENT
  // =====================================================

  const [consentGiven, setConsentGiven] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // NOTIFICATION
  // =====================================================

  const showError = (message: string) => {
    setNotificationType("error");
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // =====================================================
    // CONSENT CHECK
    // =====================================================

    if (!consentGiven) {
      showError("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          consentGiven: true,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        const message = "Registration Successful";

        // Store as fallback
        sessionStorage.setItem("auth_notification", message);

        // Show immediately
        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
        );

        router.push("/");
      } else {
        showError(result.message);
      }
    } catch (error) {
      console.error("Register Error:", error);

      showError("Something went wrong");
    } finally {
      setLoading(false);
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
            left-5
            right-5
            top-[105px]
            z-[100]
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-white
            px-4
            py-3.5
            text-red-600
            shadow-2xl
            sm:left-auto
            sm:right-6
            sm:top-24
            sm:max-w-md
            sm:items-center
            sm:rounded-xl
            sm:px-5
            sm:py-4
          "
        >
          <span className="mt-0.5 shrink-0 text-lg sm:mt-0 sm:text-xl">!</span>

          <p className="min-w-0 flex-1 break-words text-sm font-medium leading-5">
            {notification}
          </p>
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
          px-4
          py-4
          sm:px-6
          sm:py-6
          lg:items-center
          lg:px-8
          lg:py-8
        "
      >
        <div className="mx-auto w-full max-w-5xl">
          {/* =================================================
              MAIN CARD
          ================================================= */}

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
                  border-white/30
                  sm:h-52
                  lg:h-auto
                  lg:w-[45%]
                  lg:border-b-0
                  lg:border-r
                "
              >
                <Image
                  src="/images/user/RegisterBanner2.png"
                  alt="The GetOvr Register"
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
                  {/* =================================================
                      WELCOME TEXT
                  ================================================= */}

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
                    CREATE ACCOUNT
                  </p>

                  {/* =================================================
                      HEADING
                  ================================================= */}

                  <h1
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      leading-[1.1]
                      text-zinc-900
                      sm:text-4xl
                    "
                  >
                    Join <span className="text-[#a67c35]">The GetOvr</span>
                  </h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-[#77736d]
                      sm:mt-4
                    "
                  >
                    Create your account and start your
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    journey with The GetOvr.
                  </p>

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form onSubmit={handleSubmit}>
                    {/* =================================================
                        NAME FIELDS
                    ================================================= */}

                    <div
                      className="
                        mt-5
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                      "
                    >
                      {/* FIRST NAME */}

                      <div className="group relative">
                        <User
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
                          id="firstName"
                          type="text"
                          placeholder=" "
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          autoComplete="given-name"
                          className="
                            peer
                            h-12
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
                          "
                        />

                        <label
                          htmlFor="firstName"
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
                          First Name
                        </label>
                      </div>

                      {/* LAST NAME */}

                      <div className="group relative">
                        <User
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
                          id="lastName"
                          type="text"
                          placeholder=" "
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          autoComplete="family-name"
                          className="
                            peer
                            h-12
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
                          "
                        />

                        <label
                          htmlFor="lastName"
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
                          Last Name
                        </label>
                      </div>

                      {/* EMAIL */}

                      <div className="group relative sm:col-span-2">
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
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=" "
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
                          Email
                        </label>
                      </div>

                      {/* PHONE */}

                      <div className="group relative">
                        <Phone
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
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder=" "
                          required
                          autoComplete="tel"
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
                          htmlFor="phone"
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
                          Phone Number
                        </label>
                      </div>

                      {/* PASSWORD */}

                      <div className="group relative">
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
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder=" "
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
                          Password
                        </label>

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
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            p-1
                            text-[#9a958d]
                            transition-all
                            duration-300
                            hover:scale-110
                            hover:text-[#181715]
                            active:scale-95
                            sm:right-5
                          "
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* =================================================
                        CONSENT
                    ================================================= */}

                    <div className="mt-5 flex items-start gap-3">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="
                          mt-1
                          h-4
                          w-4
                          shrink-0
                          cursor-pointer
                          rounded
                          border-[#d5cec3]
                          accent-[#a67c35]
                        "
                      />

                      <label
                        htmlFor="terms"
                        className="
                          cursor-pointer
                          text-sm
                          leading-6
                          text-zinc-900
                        "
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          onClick={(e) => e.stopPropagation()}
                          className="
                            font-medium
                            text-[#a67c35]
                            hover:underline
                          "
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          onClick={(e) => e.stopPropagation()}
                          className="
                            font-medium
                            text-[#a67c35]
                            hover:underline
                          "
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {/* =================================================
                        CREATE ACCOUNT BUTTON
                    ================================================= */}

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
                          rounded-2xl
                          border
                          border-[#d5c7b4]
                          bg-[#eee3d5]
                          px-4
                          text-black
                          transition-all
                          duration-300
                          hover:border-[#cdbb9f]
                          hover:bg-[#e6d8c6]
                          active:scale-[0.98]
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          sm:h-14
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
                          {loading ? "CREATING..." : "CREATE ACCOUNT"}
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
                      LOGIN LINK
                  ================================================= */}

                  <div className="mt-5 text-center sm:mt-6">
                    <p
                      className="
                        text-sm
                        leading-6
                        text-[#77736d]
                      "
                    >
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="
                          font-semibold
                          text-[#a67c35]
                          transition-colors
                          duration-300
                          hover:text-[#8f6a2e]
                        "
                      >
                        Login Here
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

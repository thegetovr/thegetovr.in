"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useCartStore } from "@/stores/cartStore";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activateAccount = useCartStore((state) => state.activateAccount);

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [loggingIn, setLoggingIn] = useState(false);

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loggingIn) return;

    try {
      setLoggingIn(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // =================================================
        // GET ACTUAL USER ID
        // =================================================

        const sessionResponse = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        const sessionResult = await sessionResponse.json();

        const userId = sessionResult?.user?.id ?? sessionResult?.user?._id;

        if (sessionResult.success && userId) {
          activateAccount(String(userId));
        }

        // =================================================
        // LOGIN NOTIFICATION
        // =================================================

        const message = "Login Successful";

        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
        );

        // =================================================
        // EXISTING REDIRECT
        // =================================================

        const redirect = searchParams.get("redirect");

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
    } finally {
      setLoggingIn(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          ERROR NOTIFICATION
      ================================================= */}

      <AnimatePresence>
        {notification && notificationType === "error" && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
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
              border-red-200
              bg-white
              px-4
              py-3
              text-red-600
              shadow-2xl
              sm:left-auto
              sm:right-6
              sm:top-24
              sm:max-w-md
              sm:items-center
              sm:px-5
              sm:py-4
            "
          >
            <motion.span
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="shrink-0 text-xl"
            >
              !
            </motion.span>

            <p className="min-w-0 flex-1 text-sm font-medium leading-5">
              {notification}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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
          py-6
          sm:px-6
          sm:py-8
          lg:items-center
          lg:px-8
        "
      >
        {/* =================================================
            MAIN CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-5xl"
        >
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
                  IMAGE
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -35,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
              </motion.div>

              {/* =================================================
                  FORM SECTION
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 35,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                      WELCOME
                  ================================================= */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35,
                    }}
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
                  </motion.p>

                  {/* =================================================
                      HEADING
                  ================================================= */}

                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 22,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
                  </motion.h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5,
                    }}
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
                  </motion.p>

                  <form onSubmit={handleSubmit}>
                    {/* =================================================
                        EMAIL / PHONE
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.58,
                      }}
                      className="group relative mt-5 sm:mt-6"
                    >
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
                        disabled={loggingIn}
                        required
                        autoComplete="username"
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
                          disabled:cursor-not-allowed
                          disabled:opacity-70
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
                    </motion.div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.66,
                      }}
                      className="group relative mt-5 sm:mt-6"
                    >
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
                        disabled={loggingIn}
                        required
                        autoComplete="current-password"
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
                          disabled:cursor-not-allowed
                          disabled:opacity-70
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

                      <button
                        type="button"
                        disabled={loggingIn}
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
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={showPassword ? "hide" : "show"}
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                              rotate: -45,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.5,
                              rotate: 45,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="block"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </motion.div>

                    {/* =================================================
                        FORGOT PASSWORD
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.74,
                      }}
                      className="mt-3 flex justify-end sm:mt-4"
                    >
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
                    </motion.div>

                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.82,
                      }}
                      className="mt-5 sm:mt-6"
                    >
                      <motion.button
                        type="submit"
                        disabled={loggingIn}
                        whileHover={
                          !loggingIn
                            ? {
                                scale: 1.02,
                                y: -2,
                              }
                            : undefined
                        }
                        whileTap={
                          !loggingIn
                            ? {
                                scale: 0.97,
                              }
                            : undefined
                        }
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
                          hover:border-[#cdbb9f]
                          hover:bg-[#e6d8c6]
                          disabled:cursor-not-allowed
                          disabled:opacity-80
                          sm:h-14
                          sm:px-6
                        "
                      >
                        <div />

                        <span
                          className="
                            inline-flex
                            items-center
                            justify-self-center
                            text-md
                            font-semibold
                          "
                        >
                          {loggingIn ? (
                            <>
                              <motion.span
                                className="
                                  mr-2
                                  h-4
                                  w-4
                                  rounded-full
                                  border-2
                                  border-[#8f6a2e]/25
                                  border-t-[#8f6a2e]
                                "
                                animate={{
                                  rotate: 360,
                                }}
                                transition={{
                                  duration: 0.75,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              LOGGING IN...
                            </>
                          ) : (
                            <span className="transition-transform duration-300 group-hover:scale-105">
                              LOG IN
                            </span>
                          )}
                        </span>

                        {!loggingIn ? (
                          <motion.span
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut",
                            }}
                            className="justify-self-end"
                          >
                            <ArrowRight size={20} className="text-[#8f6a2e]" />
                          </motion.span>
                        ) : (
                          <div />
                        )}
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* =================================================
                      REGISTER
                  ================================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.9,
                    }}
                    className="mt-4 text-center sm:mt-5"
                  >
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
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </main>
    </>
  );
}

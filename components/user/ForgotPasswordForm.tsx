"use client";

import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  // =====================================================
  // SUBMIT
  // =====================================================

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
      {/* =================================================
          NOTIFICATION
      ================================================= */}

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{
              opacity: 0,
              y: -60,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 22,
            }}
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
            <motion.span
              initial={{
                scale: 0,
                rotate: -90,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.12,
                type: "spring",
                stiffness: 500,
                damping: 18,
              }}
              className="shrink-0 text-xl"
            >
              {notificationType === "success" ? "✓" : "!"}
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
        <div className="mx-auto w-full max-w-5xl">
          {/* =================================================
              MAIN CARD
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
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
              {/* =================================================
                  BANNER
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
                <motion.div
                  initial={{
                    scale: 1.2,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0"
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
                </motion.div>
              </motion.div>

              {/* =================================================
                  FORM SECTION
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
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
                  lg:p-10
                "
              >
                <div className="w-full max-w-lg">
                  {/* =================================================
                      RECOVERY LABEL
                  ================================================= */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.65,
                    }}
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
                  </motion.p>

                  {/* =================================================
                      HEADING
                  ================================================= */}

                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
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
                  </motion.h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.85,
                    }}
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
                  </motion.p>

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form onSubmit={handleSubmit}>
                    {/* =================================================
                        EMAIL INPUT
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 1,
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
                    </motion.div>

                    {/* =================================================
                        SEND RESET LINK
                    ================================================= */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 1.15,
                      }}
                      className="mt-5 sm:mt-6"
                    >
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={
                          !loading
                            ? {
                                scale: 1.02,
                                y: -2,
                              }
                            : undefined
                        }
                        whileTap={
                          !loading
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

                        <span className="justify-self-end">
                          {loading ? (
                            <motion.span
                              className="
                                block
                                h-5
                                w-5
                                rounded-full
                                border-2
                                border-[#8f6a2e]/30
                                border-t-[#8f6a2e]
                              "
                              animate={{
                                rotate: 360,
                              }}
                              transition={{
                                duration: 0.7,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          ) : (
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
                              className="block"
                            >
                              <ArrowRight
                                size={20}
                                className="text-[#8f6a2e]"
                              />
                            </motion.span>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* =================================================
                      BACK TO LOGIN
                  ================================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1.3,
                    }}
                    className="mt-6 text-center sm:mt-8"
                  >
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
                        hover:gap-3
                        hover:text-[#8f6a2e]
                      "
                    >
                      <ArrowLeft size={16} />
                      Back to Login
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}

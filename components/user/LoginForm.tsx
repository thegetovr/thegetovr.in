"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [notification, setNotification] = useState("");

  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
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

      console.log(result);

      if (result.success) {
        sessionStorage.setItem("auth_notification", "Login Successful");

        window.location.href = "/";
      } else {
        setNotificationType("error");
        setNotification(result.message);

        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
    } catch (error) {
      console.error("Login Error:", error);

      setNotificationType("error");
      setNotification("Something went wrong");

      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {notification && notificationType === "error" && (
        <div
          className="fixed right-6 top-24 z-[100] flex items-center gap-3
    rounded-xl border border-red-500/40 bg-red-500/10
    px-5 py-4 text-red-400 shadow-2xl"
        >
          <span className="text-xl">!</span>

          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}
      <main className="flex h-[calc(100vh-80px)] items-center justify-center bg-black px-8 py-8">
        <div className="mx-auto w-full max-w-5xl">
          <section
            className=" w-full max-w-5xl max-h-[calc(100vh-140px)] overflow-hidden rounded-[32px]
            border border-white/30 bg-black shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Image */}
              <div className="relative h-52 w-full overflow-hidden lg:h-auto lg:w-[45%] border-r border-white/30">
                <Image
                  src="/images/user/LoginBanner.png"
                  alt="The GetOvr Login"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={80}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
              {/* Right Side - Form */}
              <div className="flex min-h-full items-center justify-center p-4 lg:w-[55%] lg:p-6 text-white">
                <div className="w-full max-w-lg">
                  {/* Welcome Text */}
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4B400]">
                    Welcome Back
                  </p>

                  {/* Heading */}
                  <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-white">
                    Log in to <br />
                    <span className="text-[#F4B400]">The GetOvr</span>
                  </h1>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Access your account and continue
                    <br />
                    Designing your style
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Email/Phone Input */}
                    <div className="group relative mt-6">
                      <Mail
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                      group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
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
                        h-14
                        w-full
                        rounded-xl
                        border
                      border-white/50
                        bg-transparent
                        pl-12
                        pr-14
                      text-white
                        outline-none
                        transition-all
                        duration-300
                      focus:border-[#F4B400]
                                   "
                      />

                      <label
                        htmlFor="identifier"
                        className="
                      ml-6
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      bg-black
                      px-2
                      text-base
                      text-zinc-300
                      transition-all
                      duration-300

                      peer-focus:top-0
                      peer-focus:left-3                      
                      peer-focus:text-sm
                      peer-focus:text-[#F4B400]

                      peer-not-placeholder-shown:top-0                    
                      peer-not-placeholder-shown:text-sm
                      peer-not-placeholder-shown:text-[#F4B400]
                     "
                      >
                        Email or Phone Number
                      </label>
                    </div>

                    {/* Password Input */}
                    <div className="group relative mt-6">
                      <Lock
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                       group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
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
                        border-white/50
                        bg-transparent
                        pl-12
                        pr-14
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        focus:border-[#F4B400]
                      "
                      />

                      <label
                        htmlFor="password"
                        className="
                      ml-6
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      bg-[#0A0A0A]
                      px-2
                      text-base
                      text-zinc-300
                      transition-all
                      duration-300

                      peer-focus:top-0
                      peer-focus:left-3
                      peer-focus:text-sm
                      peer-focus:text-[#F4B400]

                      peer-not-placeholder-shown:top-0
                      peer-not-placeholder-shown:text-sm
                    peer-not-placeholder-shown:text-[#F4B400]
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
                        className="absolute right-5 top-1/2 -translate-y-1/2
                     text-zinc-400 
                     transition-all duration-300 
                     hover:scale-110 
                     hover:text-white active:scale-95"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* forget password */}
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="
                    text-sm
                    font-medium
                    text-zinc-300
                    transition-all
                    duration-300
                    hover:text-[#F4B400]
                    hover:underline
                    underline-offset-4
                     "
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Login Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="
                    group
                    grid
                    h-14
                    w-full
                    grid-cols-[1fr_auto_1fr]
                    items-center
                    rounded-2xl
                    bg-[#F4B400]
                    px-6
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#F6C026]
                    active:scale-[0.98]
                              "
                      >
                        <div></div>

                        <span
                          className="transition-all
                    duration-300 group-hover:scale-110 justify-self-center text-md font-semibold"
                        >
                          LOG IN
                        </span>

                        <ArrowRight
                          size={20}
                          className="justify-self-end transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-zinc-300">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="font-semibold text-[#F4B400] transition-colors duration-300 hover:text-[#FFD54A]"
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

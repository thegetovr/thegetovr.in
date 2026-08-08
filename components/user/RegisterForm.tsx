"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Form Submitted");
    console.log(formData);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  const passwordRef = useRef<HTMLInputElement>(null);

  return (
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
                src="/images/user/RegisterBanner.png"
                alt="The GetOvr Login"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            {/* Right Side - Form */}
            <div className="flex min-h-full items-center justify-center p-4 lg:w-[55%] lg:p-6 text-white">
              <div className="w-full max-w-lg ">
                {/* Welcome Text */}
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4B400]">
                  CREATE ACCOUNT
                </p>

                {/* Heading */}
                <h1 className="mt-2 text-4xl font-bold leading-[1.1] text-white">
                  Join <span className="text-[#F4B400]">The GetOvr</span>
                </h1>
                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Create your account and start your
                  <br />
                  journey with The GetOvr.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* First Name */}
                    <div className="group relative">
                      <User
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                      group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
                      />
                      <input
                        id="firstName"
                        type="text"
                        placeholder=" "
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="
                        peer
                        h-12
                        w-full
                        pl-12
                        pr-4
                        rounded-xl
                        border
                        border-white/50
                        bg-transparent
                      text-white
                        outline-none
                        transition-all
                        duration-300
                        focus:border-[#F4B400]
    "
                      />

                      <label
                        htmlFor="firstName"
                        className="
                        absolute
                        left-10
                        top-1/2
                        -translate-y-1/2
                        bg-black
                        px-2
                        text-sm
                        text-zinc-300
                        transition-all
                        duration-300

                        peer-focus:top-0
                         peer-focus:left-9
                        peer-focus:text-xs
                        peer-focus:text-[#F4B400]

                        peer-[:not(:placeholder-shown)]:top-0
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:text-[#F4B400]
    "
                      >
                        First Name
                      </label>
                    </div>

                    {/* Last Name */}
                    <div className="group relative">
                      <User
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                      group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
                      />
                      <input
                        id="lastName"
                        type="text"
                        placeholder=" "
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="
                        peer
                        h-12
                        w-full
                        rounded-xl
                        pl-12
                        pr-4
                        border
                        border-white/50
                        bg-transparent
                      text-white
                        outline-none
                        transition-all
                        duration-300
                        focus:border-[#F4B400]"
                      />

                      <label
                        htmlFor="lastName"
                        className="
                        absolute
                        
                        left-10
                        top-1/2
                        -translate-y-1/2
                        bg-black
                        px-2
                        text-sm
                        text-zinc-300
                        transition-all
                        duration-300

                        peer-focus:top-0
                        peer-focus:left-9
                        peer-focus:text-xs
                        peer-focus:text-[#F4B400]

                        peer-[:not(:placeholder-shown)]:top-0
                        peer-[:not(:placeholder-shown)]:text-xs
                      peer-[:not(:placeholder-shown)]:text-[#F4B400]
    "
                      >
                        Last Name
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="md:col-span-2">
                      <div className="group relative">
                        <Mail
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                      group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
                        />

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=" "
                          className="
                        peer
                        h-12
                        w-full
                        rounded-xl
                        border
                    border-white/50
                        bg-transparent
                        pl-12
                        pr-4
                    text-white
                        outline-none
                        transition-all
                        duration-300
                    focus:border-[#F4B400]
                    "
                        />

                        <label
                          htmlFor="email"
                          className="
                      absolute
                      left-10
                      top-1/2
                      -translate-y-1/2
                      bg-black
                      px-2
                      text-base
                      text-zinc-300
                      transition-all
                      duration-300

                      peer-focus:top-0
                      peer-focus:left-9                    
                      peer-focus:text-sm
                      peer-focus:text-[#F4B400]

                      peer-not-placeholder-shown:top-0                    
                      peer-not-placeholder-shown:text-sm
                      peer-not-placeholder-shown:text-[#F4B400]
                     "
                        >
                          Email
                        </label>
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="group relative">
                      <Phone
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400
                       transition-all
                      duration-300
                      group-focus-within:text-[#F4B400]
                       group-focus-within:scale-110"
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
                        className="
                    peer
                    h-12
                    w-full
                    rounded-xl
                    border
                  border-white/50
                    bg-transparent
                    pl-12
                    pr-4
                  text-white
                    outline-none
                    transition-all
                    duration-300
                  focus:border-[#F4B400]
    "
                      />

                      <label
                        htmlFor="phone"
                        className="
                      absolute
                      left-10
                      top-1/2
                      -translate-y-1/2
                      bg-black
                      px-2
                      text-base
                      text-zinc-300
                      transition-all
                      duration-300

                      peer-focus:top-0
                      peer-focus:left-9                   
                      peer-focus:text-xs
                      peer-focus:text-[#F4B400]

                      peer-not-placeholder-shown:top-0                    
                      peer-not-placeholder-shown:text-xs
                      peer-not-placeholder-shown:text-[#F4B400]
                     "
                      >
                        Phone Number
                      </label>
                    </div>

                    {/* Password Input */}
                    <div className="group relative">
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                        className="
                        peer
                        h-12    
                        w-full
                        rounded-xl
                        border
                        border-white/50
                        bg-transparent
                        pl-12
                        pr-12
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
                      absolute
                      left-10
                      top-1/2
                      -translate-y-1/2
                      bg-black
                      px-2
                      text-base
                      text-zinc-300
                      transition-all
                      duration-300

                      peer-focus:top-0
                      peer-focus:left-9
                      peer-focus:text-xs
                      peer-focus:text-[#F4B400]

                      peer-not-placeholder-shown:top-0
                      peer-not-placeholder-shown:text-xs
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
                  </div>

                  {/* Terms and Condition */}
                  <div className="mt-5 flex items-start gap-3">
                    <input
                      id="terms"
                      type="checkbox"
                      className="
                    mt-1
                    h-4
                    w-4
                    rounded
                    border-white/30
                    bg-transparent
                    accent-[#F4B400]
                    cursor-pointer
                             "
                    />

                    <label
                      htmlFor="terms"
                      className="text-sm leading-6 text-zinc-400"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-[#F4B400] hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-[#F4B400] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Create Account Button */}
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
                        CREATE ACCOUNT
                      </span>

                      <ArrowRight
                        size={20}
                        className="justify-self-end transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                    {/* Social Media Logins */}
                    {/* <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/50"></div>

                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-300">
                      Or Continue With
                    </span>

                    <div className="h-px flex-1 bg-white/50"></div> 
                    </div>*/}
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-zinc-300">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#F4B400] transition-colors duration-300 hover:text-[#FFD54A]"
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
  );
}

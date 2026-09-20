"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface HeroCarouselProps {
  hero: HomeHero;
}

interface HeroSlide {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: {
    url: string;
    alt: string;
  } | null;
}

function createSlides(hero: HomeHero): HeroSlide[] {
  return [
    {
      eyebrow: "NEW ARRIVALS / FW'26",
      heading: "Made\nDifferent",
      description: "CLOTHES FOR A MORE AUTHENTIC YOU.",
      ctaLabel: "SHOP THE COLLECTION",
      ctaLink: hero.primaryCtaLink || "/shop",
      image: hero.image,
    },
    {
      eyebrow: "THE GETOVR EDIT / 02",
      heading: "Wear\nYour Story",
      description: "PREMIUM STREETWEAR FOR YOUR OWN EXPRESSION.",
      ctaLabel: "EXPLORE THE COLLECTION",
      ctaLink: hero.primaryCtaLink || "/shop",
      image: hero.image,
    },
    {
      eyebrow: "CREATE / FW'26",
      heading: "Make\nIt Yours",
      description: "DESIGN PIECES THAT FEEL LIKE YOU.",
      ctaLabel: "EXPLORE STUDIO",
      ctaLink: hero.secondaryCtaLink || "/studio",
      image: hero.image,
    },
  ];
}

export default function HeroCarousel({ hero }: HeroCarouselProps) {
  const slides = createSlides(hero);

  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      const nextIndex =
        ((index % slides.length) + slides.length) % slides.length;

      setActiveIndex(nextIndex);
    },
    [slides.length],
  );

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [activeIndex, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);

  const slide = slides[activeIndex];

  return (
    <div className="relative w-full overflow-hidden">
      {/* =========================================================
          MOBILE
          ========================================================= */}
      <div className="lg:hidden">
        <div className="relative h-[52svh] min-h-[390px] max-h-[540px] overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={`mobile-image-${activeIndex}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute inset-0 overflow-hidden"
            >
              {slide.image?.url ? (
                <motion.div
                  initial={{
                    scale: 1.08,
                    filter: "blur(4px) brightness(0.82)",
                  }}
                  animate={{
                    scale: 1,
                    filter: "blur(0px) brightness(1)",
                  }}
                  transition={{
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image.url}
                    alt={slide.image.alt || slide.heading}
                    fill
                    priority={activeIndex === 0}
                    quality={100}
                    sizes="100vw"
                    className="object-cover object-[58%_27%]"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-(--color-page) text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
                  Hero Image
                </div>
              )}

              {/* Cinematic Overlay */}
              <motion.div
                initial={{
                  opacity: 0.16,
                }}
                animate={{
                  opacity: 0.04,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute inset-0 bg-black"
              />
            </motion.div>
          </AnimatePresence>

          {/* Mobile Scroll Indicator */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-5 right-5 z-20"
          >
            <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full border border-white/70 bg-black/10 text-white backdrop-blur-[3px]">
              <span className="text-center text-[7px] font-medium uppercase leading-[1.55] tracking-[0.15em]">
                Scroll
                <br />
                to explore
              </span>

              <ArrowDown size={12} strokeWidth={1} className="mt-1.5" />
            </div>
          </motion.div>
        </div>

        {/* Mobile Editorial Content */}
        <div className="bg-(--color-page) px-6 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-11">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`mobile-content-${activeIndex}`}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-9 bg-(--color-text-primary)" />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-secondary)">
                  {slide.eyebrow}
                </p>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 24,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 whitespace-pre-line text-[clamp(4rem,15vw,5.8rem)] font-light leading-[0.78] tracking-[-0.075em] text-(--color-text-primary)"
              >
                {slide.heading}
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.22,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-[350px] text-[10px] font-medium uppercase leading-[1.75] tracking-[0.16em] text-(--color-text-secondary)"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={slide.ctaLink}
                  className="group mt-8 inline-flex h-[50px] items-center gap-7 bg-(--color-text-primary) px-7 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-transform duration-300 active:scale-[0.98]"
                >
                  {slide.ctaLabel}

                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Mobile Controls */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                }}
                className="mt-9 flex items-center gap-4"
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to hero slide ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`flex h-9 min-w-6 items-center justify-center text-[10px] tracking-[0.08em] transition-all duration-300 ${
                      activeIndex === index
                        ? "font-semibold text-(--color-text-primary)"
                        : "text-(--color-text-muted)"
                    }`}
                  >
                    0{index + 1}
                  </button>
                ))}

                <span className="ml-2 h-px w-10 bg-(--color-border)" />

                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous hero slide"
                  className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-50"
                >
                  <ArrowLeft size={15} strokeWidth={1.4} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next hero slide"
                  className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-50"
                >
                  <ArrowRight size={15} strokeWidth={1.4} />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================
          DESKTOP
          ========================================================= */}
      <div className="relative hidden h-[min(760px,calc(100svh-68px))] min-h-[620px] overflow-hidden lg:block">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`desktop-image-${activeIndex}`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
            className="absolute inset-0 overflow-hidden"
          >
            {slide.image?.url ? (
              <motion.div
                initial={{
                  scale: 1.075,
                  filter: "blur(5px) brightness(0.78)",
                }}
                animate={{
                  scale: 1,
                  filter: "blur(0px) brightness(1)",
                }}
                transition={{
                  duration: 1.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.heading}
                  fill
                  priority={activeIndex === 0}
                  quality={100}
                  sizes="100vw"
                  className="object-cover object-[58%_27%]"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-(--color-page) text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
                Hero Image
              </div>
            )}

            {/* Cinematic Overlay */}
            <motion.div
              initial={{
                opacity: 0.15,
              }}
              animate={{
                opacity: 0.035,
              }}
              transition={{
                duration: 1.3,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 bg-black"
            />
          </motion.div>
        </AnimatePresence>

        {/* Desktop Content */}
        <div className="relative z-10 flex h-full items-center px-[4.5vw]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`desktop-content-${activeIndex}`}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -14,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-[650px] pb-10"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-9 bg-(--color-text-primary)" />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-secondary)">
                  {slide.eyebrow}
                </p>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 28,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 max-w-[580px] whitespace-pre-line text-[clamp(5.8rem,7vw,7.2rem)] font-light leading-[0.79] tracking-[-0.075em] text-(--color-text-primary)"
              >
                {slide.heading}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.23,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 max-w-[440px] text-[11px] font-medium uppercase leading-[1.75] tracking-[0.17em] text-(--color-text-secondary)"
              >
                {slide.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.32,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={slide.ctaLink}
                  className="group mt-8 inline-flex h-[50px] items-center gap-6 bg-(--color-text-primary) px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                >
                  {slide.ctaLabel}

                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Desktop Controls */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.42,
                  duration: 0.5,
                }}
                className="mt-11 flex items-center gap-5"
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to hero slide ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`flex h-8 min-w-5 items-center justify-center text-[10px] tracking-[0.08em] transition-all duration-300 ${
                      activeIndex === index
                        ? "font-semibold text-(--color-text-primary)"
                        : "text-(--color-text-muted)"
                    }`}
                  >
                    0{index + 1}
                  </button>
                ))}

                <span className="ml-1 h-px w-10 bg-(--color-border)" />

                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous hero slide"
                  className="ml-1 flex h-8 w-8 items-center justify-center transition-opacity duration-300 hover:opacity-50"
                >
                  <ArrowLeft size={15} strokeWidth={1.4} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next hero slide"
                  className="flex h-8 w-8 items-center justify-center transition-opacity duration-300 hover:opacity-50"
                >
                  <ArrowRight size={15} strokeWidth={1.4} />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Scroll Indicator */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.7,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-9 right-9 z-20"
        >
          <div className="flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full border border-white/65 bg-black/[0.025] text-white backdrop-blur-[2px]">
            <span className="text-center text-[7px] font-medium uppercase leading-[1.55] tracking-[0.14em]">
              Scroll
              <br />
              to explore
            </span>

            <ArrowDown size={13} strokeWidth={1} className="mt-1.5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import FormField from "@/components/ui/FormField";

interface ReviewFormProps {
  productId: string;
}

interface ReviewFormData {
  customerName: string;
  rating: number;
  title: string;
  comment: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    defaultValues: {
      customerName: "",
      rating: 5,
      title: "",
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your review.");
      }

      reset();

      setSuccessMessage(
        "Thank you! Your review was submitted and is awaiting approval.",
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your review. Please try again.",
      );
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="text-xl font-bold text-white">Write a Review</h3>

      <p className="mt-2 text-sm text-zinc-500">
        Share your experience with this product. Reviews are published after
        approval.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Your Name"
          required
          placeholder="Your name"
          registration={register("customerName", {
            required: "Your name is required.",
            maxLength: {
              value: 100,
              message: "Your name cannot exceed 100 characters.",
            },
          })}
          error={errors.customerName?.message}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Rating <span className="text-red-400">*</span>
          </label>

          <select
            {...register("rating", {
              valueAsNumber: true,
              required: "Please select a rating.",
              min: {
                value: 1,
                message: "Rating must be between 1 and 5.",
              },
              max: {
                value: 5,
                message: "Rating must be between 1 and 5.",
              },
            })}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition-all focus:border-white"
          >
            <option value={5}>★★★★★ — Excellent</option>
            <option value={4}>★★★★ — Very Good</option>
            <option value={3}>★★★ — Good</option>
            <option value={2}>★★ — Fair</option>
            <option value={1}>★ — Poor</option>
          </select>

          {errors.rating?.message && (
            <p className="mt-1 text-sm text-red-400">
              {errors.rating.message}
            </p>
          )}
        </div>

        <FormField
          label="Review Title"
          required
          placeholder="Summarize your experience"
          registration={register("title", {
            required: "Review title is required.",
            maxLength: {
              value: 120,
              message: "Review title cannot exceed 120 characters.",
            },
          })}
          error={errors.title?.message}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Your Review <span className="text-red-400">*</span>
          </label>

          <textarea
            {...register("comment", {
              required: "Review comment is required.",
              maxLength: {
                value: 1000,
                message: "Review comment cannot exceed 1000 characters.",
              },
            })}
            rows={5}
            placeholder="Tell us about the product, quality, fit, or your overall experience."
            className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all ${
              errors.comment
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-700 focus:border-white"
            }`}
          />

          {errors.comment?.message && (
            <p className="mt-1 text-sm text-red-400">
              {errors.comment.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {submitError}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
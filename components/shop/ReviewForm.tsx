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
    <section className="mt-10 rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)">
      <h3 className="font-(--font-editorial) text-2xl font-normal text-(--color-text-primary)">
        Write a Review
      </h3>

      <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
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
          <label className="mb-2 block text-sm font-medium text-(--color-text-primary)">
            Rating <span className="text-(--color-error)">*</span>
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
            className="w-full rounded-(--radius-sm) border border-(--color-input-border) bg-(--color-input-background) px-4 py-3 text-(--color-text-primary) outline-none transition-colors focus:border-(--color-input-focus)"
          >
            <option value={5}>★★★★★ — Excellent</option>
            <option value={4}>★★★★ — Very Good</option>
            <option value={3}>★★★ — Good</option>
            <option value={2}>★★ — Fair</option>
            <option value={1}>★ — Poor</option>
          </select>

          {errors.rating?.message && (
            <p className="mt-1 text-sm text-(--color-error)">
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
          <label className="mb-2 block text-sm font-medium text-(--color-text-primary)">
            Your Review <span className="text-(--color-error)">*</span>
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
            className={`w-full rounded-(--radius-sm) border bg-(--color-input-background) px-4 py-3 text-(--color-text-primary) placeholder:text-(--color-input-placeholder) outline-none transition-colors ${
              errors.comment
                ? "border-(--color-error) focus:border-(--color-error)"
                : "border-(--color-input-border) focus:border-(--color-input-focus)"
            }`}
          />

          {errors.comment?.message && (
            <p className="mt-1 text-sm text-(--color-error)">
              {errors.comment.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="rounded-(--radius-sm) border border-(--color-error)/30 bg-(--color-error-background) px-4 py-3 text-sm text-(--color-error)">
            {submitError}
          </div>
        )}

        {successMessage && (
          <div className="rounded-(--radius-sm) border border-(--color-accent)/30 bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text-secondary)">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-sm bg-(--color-text-primary) px-6 py-3 font-semibold text-(--color-white) transition-colors hover:bg-(--color-text-secondary) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
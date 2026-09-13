import { Suspense } from "react";
import ResetPasswordForm from "@/components/user/ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

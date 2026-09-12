import { Suspense } from "react";

import LoginForm from "@/components/user/LoginForm";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
import { LoginForm } from "@/components/forms/auth/login-form";
import { getSession } from "@/lib/firebase/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session.success) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-stone-100 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

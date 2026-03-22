"use client";
import { Eye, EyeOffIcon, GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/lib/firebase/client";
import { LOGIN_SCHEMA } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form-nextjs";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, useState } from "react";
import { toast } from "sonner";
import FieldInfo from "../field-info";
import { useSession } from "@/hooks/use-session";
import { createSession } from "@/lib/firebase/session";
import { FirebaseError } from "firebase/app";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { signInWithGoogle, isLoading } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LOGIN_SCHEMA,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          value.email,
          value.password,
        );

        const { user } = res;

        // Create a session cookie
        const idToken = await user.getIdToken();

        if (!idToken) return;

        const sessionCreate = await createSession(idToken);

        if (!sessionCreate.success)
          throw new Error("Failed to create session.");

        toast.success("Login successful!");
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        const err =
          error instanceof FirebaseError &&
          error.code === "auth/invalid-credential"
            ? "Invalid credentials"
            : "Something went wrong!";
        toast.error(err);
      }
    },
  });
  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    router.push("/dashboard");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </FieldDescription>
          </div>

          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </Field>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    name={field.name}
                    value={field.state.value}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton onClick={handlePasswordVisibility}>
                      <Activity mode={!showPassword ? "visible" : "hidden"}>
                        <EyeOffIcon />
                      </Activity>
                      <Activity mode={showPassword ? "visible" : "hidden"}>
                        <Eye />
                      </Activity>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldInfo field={field} />
              </Field>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Field>
                <Button disabled={isSubmitting} type="submit">
                  <Activity mode={isSubmitting ? "visible" : "hidden"}>
                    <Spinner />
                  </Activity>
                  <Activity mode={isSubmitting ? "hidden" : "visible"}>
                    Login
                  </Activity>
                </Button>
              </Field>
            )}
          />

          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-1">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

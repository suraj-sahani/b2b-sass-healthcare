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
import { SIGN_UP_SCHEMA } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { Activity, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import FieldInfo from "../field-info";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { signInWithGoogle, isLoading } = useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: { onSubmit: SIGN_UP_SCHEMA },
    onSubmit: async ({ value }) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          value.email,
          value.password,
        );

        const idToken = await user.getIdToken();

        await fetch("/api/auth/session/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        toast.success("Signup successful!");
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "Signup failed!");
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(value);
    },
  });

  const handlePasswordVisibility = (field: "password" | "confirmPassword") =>
    setShowPassword((prev) => {
      return {
        ...prev,
        [field]: !prev[field],
      };
    });

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
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </div>
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
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
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => handlePasswordVisibility("password")}
                    >
                      <Activity
                        mode={!showPassword.password ? "visible" : "hidden"}
                      >
                        <EyeOffIcon />
                      </Activity>
                      <Activity
                        mode={showPassword.password ? "visible" : "hidden"}
                      >
                        <Eye />
                      </Activity>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldInfo field={field} />
              </Field>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="password">Confirm Password</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    name={field.name}
                    value={field.state.value}
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() =>
                        handlePasswordVisibility("confirmPassword")
                      }
                    >
                      <Activity
                        mode={
                          !showPassword.confirmPassword ? "visible" : "hidden"
                        }
                      >
                        <EyeOffIcon />
                      </Activity>
                      <Activity
                        mode={
                          showPassword.confirmPassword ? "visible" : "hidden"
                        }
                      >
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
                    Create Account
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

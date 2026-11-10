"use client";

import AuthLink from "@/components/Auth/authlink";
import AuthShell from "@/components/Auth/authshell";
import Button from "@/components/Auth/button";
import PasswordField from "@/components/Auth/passwordfield";
import SocialAuth from "@/components/Auth/socialauth";
import TextField from "@/components/Auth/textfield";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const url = process.env.NEXT_PUBLIC_BASEURL;
  const router = useRouter();

  // Checks the inputs and returns a message for each one that is wrong.
  function validate() {
    const found: Record<string, string> = {};

    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      found.email = "Enter a valid email address.";
    if (password.length < 8)
      found.password = "Password must be at least 8 characters.";
    return found;
  }

  async function sendLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return; // stops double submits

    const found = validate();
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/");
    } catch (error) {
      if (error instanceof TypeError) {
        // fetch itself failed: server is down or there is no connection
        setFormError(
          "Can’t reach the server. Check your connection and try again.",
        );
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back to amaget"
      subtitle="Enter your details to log in."
    >
      <form className="space-y-5" noValidate onSubmit={sendLogin}>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="John@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={errors.password}
        />

        {formError && (
          <p role="alert" className="text-sm text-red-600">
            {formError}
          </p>
        )}
        <div className="flex min-h-10 items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded accent-primary"
            />
            Remember me
          </label>
          <AuthLink href="#">Forgot password?</AuthLink>
        </div>

        <Button className="w-full" type="submit">
          {loading ? "signing you in..." : "sign in"}
        </Button>
      </form>

      <div className="mt-8">
        <SocialAuth action="Sign in" />
      </div>

      <p className="mt-8 text-center text-sm text-foreground/70">
        Don’t have an account? <AuthLink href="/signup">Create one</AuthLink>
      </p>
    </AuthShell>
  );
}

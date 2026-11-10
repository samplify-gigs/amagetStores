"use client";

import AuthLink from "@/components/Auth/authlink";
import AuthShell from "@/components/Auth/authshell";
import Button from "@/components/Auth/button";
import PasswordField from "@/components/Auth/passwordfield";
import SocialAuth from "@/components/Auth/socialauth";
import TextField from "@/components/Auth/textfield";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const router = useRouter();

  // Checks the inputs and returns a message for each one that is wrong.
  function validate() {
    const found: Record<string, string> = {};
    if (!firstname.trim()) found.firstName = "Enter your first name.";
    if (!lastname.trim()) found.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) found.email = "Enter a valid email address.";
    if (password.length < 8) found.password = "Password must be at least 8 characters.";
    return found;
  }

  async function submitlogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return; // stops double submits

    const found = validate();
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname.trim(),
          last_name: lastname.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/verify-email");
    } catch (error) {
      if (error instanceof TypeError) {
        // fetch itself failed: server is down or there is no connection
        setFormError("Can’t reach the server. Check your connection and try again.");
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
    <AuthShell title="Create your account" subtitle="It only takes a minute.">
      <form className="space-y-5" noValidate onSubmit={submitlogin}>
        <TextField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          placeholder="Your first name"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          error={errors.firstName}
        />

        <TextField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          placeholder="Your last name"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          error={errors.lastName}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={errors.password}
        />

        {formError && (
          <p role="alert" className="text-sm text-red-600">
            {formError}
          </p>
        )}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-8">
        <SocialAuth action="Sign up" />
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-foreground/60">
        By creating an account, you agree to our{" "}
        <AuthLink href="#" className="underline">
          Terms of Service
        </AuthLink>{" "}
        and{" "}
        <AuthLink href="#" className="underline">
          Privacy Policy
        </AuthLink>
        .
      </p>

      <p className="mt-6 text-center text-sm text-foreground/70">
        Already have an account? <AuthLink href="/login">Sign in</AuthLink>
      </p>
    </AuthShell>
  );
}
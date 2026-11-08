"use client";

import AuthLink from "@/components/Auth/authlink";
import AuthShell from "@/components/Auth/authshell";
import Button from "@/components/Auth/button";
import PasswordField from "@/components/Auth/passwordfield";
import SocialAuth from "@/components/Auth/socialauth";
import TextField from "@/components/Auth/textfield";
import React from "react";
import { useState } from "react";

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitlogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log(data.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("register failed:", error);
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
          name="name"
          autoComplete="name"
          placeholder="Your first name"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />

        <TextField
          label="Last name"
          name="name"
          autoComplete="name"
          placeholder="Your last name"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button className="w-full" type="submit">
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

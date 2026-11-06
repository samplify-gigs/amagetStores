import AuthLink from "@/components/Auth/authlink";
import AuthShell from "@/components/Auth/authshell";
import Button from "@/components/Auth/button";
import PasswordField from "@/components/Auth/passwordfield";
import SocialAuth from "@/components/Auth/socialauth";
import TextField from "@/components/Auth/textfield";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <AuthShell title="Create your account" subtitle="It only takes a minute.">
      <form className="space-y-5" noValidate>
        <TextField
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
        />

        <Button className="w-full">Create account</Button>
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

import AuthLink from "@/components/Auth/authlink";
import AuthShell from "@/components/Auth/authshell";
import Button from "@/components/Auth/button";
import PasswordField from "@/components/Auth/passwordfield";
import SocialAuth from "@/components/Auth/socialauth";
import TextField from "@/components/Auth/textfield";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back to amaget"
      subtitle="Enter your details to log in."
      
    >
      <form className="space-y-5" noValidate>
        <TextField label="Email address" name="email" type="email" autoComplete="email" placeholder="John@example.com" />
        <PasswordField label="Password" name="password" autoComplete="current-password" placeholder="Enter your password" />

        <div className="flex min-h-10 items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" className="size-4 rounded accent-primary" />
            Remember me
          </label>
          <AuthLink href="#">Forgot password?</AuthLink>
        </div>

        <Button className="w-full">Sign in</Button>
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
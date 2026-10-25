import { FacebookIcon, GoogleIcon } from "./icons";

const socialButton =
  "inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-black/20 bg-card text-sm font-semibold transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function SocialAuth({ action }: { action: "Sign in" | "Sign up" }) {
  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-foreground/60">
        <span className="h-px flex-1 bg-black/20" />
        <span>Or {action.toLowerCase()} with</span>
        <span className="h-px flex-1 bg-black/20" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" aria-label={`${action} with Google`} className={socialButton}>
          <GoogleIcon className="size-5" />
          Google
        </button>
        <button type="button" aria-label={`${action} with Facebook`} className={socialButton}>
          <FacebookIcon className="size-5" />
          Facebook
        </button>
      </div>
    </div>
  );
}
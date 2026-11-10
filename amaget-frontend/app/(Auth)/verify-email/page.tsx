export const metadata = { title: "Check your email" };


export default function VerifyEmailPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-3xl  bg-card px-6 py-10 text-center shadow-sm sm:max-w-lg sm:px-12 sm:py-14 2xl:max-w-xl">
        <span className="mx-auto grid size-20 place-items-center rounded-2xl bg-primary/10 text-primary sm:size-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-10 sm:size-12"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </span>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
          Thank you
        </h1>
        <p className="mt-3 text-base leading-7 text-foreground/70 sm:text-lg">
          Please check your inbox to verify your email address so you can access
          your account.
        </p>

        <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-5 sm:px-6">
          <p className="font-semibold">Can’t find the email?</p>
          <p className="mt-1 text-sm leading-6 text-foreground/70 sm:text-base">
            It can take a few minutes to arrive. Remember to check your spam
            folder too.
          </p>
        </div>
      </div>
    </main>
  );
}

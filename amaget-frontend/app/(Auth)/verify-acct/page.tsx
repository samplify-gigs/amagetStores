"use client";

import Button from "@/components/Auth/button";
import { Confetti, Svg } from "@/components/Auth/confetti";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("token");
  const [status, setStatus] = useState<Status>("loading");
  const [resending, setResending] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASEURL;

  const current: Status = token ? status : "error";

  useEffect(() => {
    if (!token) return;

    async function verifyEmail() {
      try {
        const res = await fetch(`${url}/auth/verify-email`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setStatus("success");

        console.log("data verify:", data.message);
      } catch (err) {
        setStatus("error");
        console.error("verify email error:", err);
      }
    }

    verifyEmail();
  }, [token]);

  async function handleResend() {
    if (resending) return; // ignore double clicks
    setResending(true);

    try {

      const res = await fetch(``)
      // 2) RESEND THE VERIFICATION EMAIL
      //    Call your backend's resend endpoint here (await the request).
      //      - on success: tell the user a new email was sent
      //        (for example, router.push("/verify-email"))
      //      - on failure: show an error message
    } catch (error) {
      console.error("resend email error:", error);
      setStatus("error");
    } finally {
      setResending(false); // re-enables the button when the request ends
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-3xl  bg-card px-6 py-10 text-center shadow-sm sm:max-w-lg sm:px-12 sm:py-14 2xl:max-w-xl">
        <div aria-live="polite">
          {current === "loading" && (
            <>
              <div className="relative mx-auto grid size-24 place-items-center">
                <span className="absolute inset-0 animate-spin rounded-full border-4 border-primary/15 border-t-primary motion-reduce:animate-none" />
                <Svg className="size-9 text-primary">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </Svg>
              </div>
              <h1 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                Verifying your email...
              </h1>
              <p className="mt-3 text-base leading-7 text-foreground/70 sm:text-lg">
                This only takes a moment.
              </p>
            </>
          )}

          {current === "success" && (
            <>
              <div className="relative mx-auto h-44 w-64 sm:h-52 sm:w-80">
                <Confetti />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid size-24 place-items-center rounded-3xl bg-primary/10 text-primary">
                    <Svg className="size-12">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </Svg>
                  </span>
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                Congratulations!
              </h1>
              <p className="mt-3 text-base leading-7 text-foreground/70 sm:text-lg">
                Welcome to Amaget! Your email has been successfully verified.
                You’re all set to access your account.
              </p>
            </>
          )}

          {current === "error" && (
            <>
              <span className="mx-auto grid size-20 place-items-center rounded-2xl bg-red-500/10 text-red-600 sm:size-24 dark:text-red-400">
                <Svg className="size-10 sm:size-12">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </Svg>
              </span>
              <h1 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                Verification Link Expired
              </h1>
              <p className="mt-3 text-base leading-7 text-foreground/70 sm:text-lg">
                This verification link is no longer valid. Please request a new
                verification email to activate your account.
              </p>
              <Button
                className="mt-8 w-full sm:w-auto"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend Verification Email"}
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}

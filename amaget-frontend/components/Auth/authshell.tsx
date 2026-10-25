import Image from "next/image";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-card px-6 py-10 sm:px-10">
      <Image
        src="/Amaget-Logo-Optimized.png"
        alt="Amaget logo"
        width={90}
        height={90}
        priority
        className="h-auto w-[130px]"
        quality={88}
      />

      <section className="mt-8 w-full max-w-md lg:my-auto">
        <h1 className="text-2xl font-semibold tracking-tight  text-center">{title}</h1>
        <p className="mt-2 text-foreground/70 text-center">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
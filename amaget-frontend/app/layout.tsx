import type { Metadata } from "next";
import { inter, lusitana } from "@/fonts";
import "./globals.css";
import { FooterSec } from "@/components/Footer/footer";
import { CartProvider } from "@/components-utils/cart/items-to-cart";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "amaget stores",
  description: "the best selling gadget online gadget vendor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.className,
        lusitana.className,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <main className="flex flex-1 flex-col">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

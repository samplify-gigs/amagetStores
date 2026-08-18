import type { Metadata } from "next";
import { inter, lusitana } from "@/fonts";
import { Navbar } from "@/components/Navigation/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "amaget stores",
  description: "the best selling gadget online gadget vendor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${lusitana.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

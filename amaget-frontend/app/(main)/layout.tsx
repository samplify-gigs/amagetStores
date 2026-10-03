import type { Metadata } from "next";
import { Navbar } from "@/components/Navigation/NavBar";
import "../globals.css";
import { FooterSec } from "@/components/Footer/footer";


export const metadata: Metadata = {
  title: "amaget stores",
  description: "the best selling gadget online gadget vendor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="min-h-full flex flex-col">
      <Navbar />

      <main
        className="flow-root"
        style={{ paddingTop: "var(--nav-height, 0px)" }}
      >
        {children}
      </main>

      <FooterSec />
    </main>
  );
}

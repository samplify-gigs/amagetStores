"use client";
import { IoMdArrowDropup } from "react-icons/io";
import { AmagetLogo } from "@/components-utils/Navbar/amagetLogo";
import Link from "next/link";
import { SOCIAL_LINKS, NAV_LINKS } from "@/db/mock";

export function FooterSec() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#252E35] text-gray-300 font-sans border-0">
      {/**back to top */}
      <button
        onClick={scrollToTop}
        className="w-full flex flex-col items-center gap-0.5 py-3 bg-[#1E262C] hover:bg-[#2C3840] transition-colors duration-200 cursor-pointer group"
        aria-label="Back to top"
      >
        <IoMdArrowDropup className="text-2xl text-white group-hover:text-white transition-colors duration-200 group-hover:-translate-y-0.5 transform" />
        <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors duration-200">
          Back to top
        </span>
      </button>

      {/* Main footer body */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        {/* Nav links — stacked on mobile, row on md+ */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-10 mb-8 ">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150 tracking-wide font-semibold"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Social icons — visible md+ */}
        <div className="hidden md:flex justify-center gap-5 mb-10">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7EB8C9] hover:bg-[#7EB8C9]/10 transition-all duration-200"
            >
              <Icon className="text-lg" />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6" />

        {/* Logo (lg+) + copyright */}
        <div className="flex flex-col items-center gap-4">
          {/* AMAGET logo — visible lg+ */}
          <div className="hidden lg:flex items-center gap-2 select-none">
            <AmagetLogo />
          </div>

          <p className="text-xs text-gray-500 tracking-wide text-center">
            © {new Date().getFullYear()} Amaget. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

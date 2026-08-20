"use client";

import { AmagetLogo } from "@/components-utils/Navbar/amagetLogo";
import {
  CategoriesForSidebar,
  NavBarprops,
  NavLinksForSidebar,
} from "@/db/mock";
import Link from "next/link";

export function Overlay({ open, setOpenAction }: NavBarprops) {
  return (
    <div
      className={`fixed inset-0 lg:hidden z-60 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}   bg-black/55 backdrop-blur-xs`}
      onClick={() => setOpenAction(false)}
    />
  );
}

export function SideBar({ open, setOpenAction }: NavBarprops) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-[#252E35] z-70 flex flex-col lg:hidden ${open ? "translate-x-0" : "-translate-x-full"} transition-transform ease-in-out duration-200`}
    >
      <div className="flex items-center justify-between px-6 py-7 border-b border-white/[0.06]">
        <span className="font-bold text-xl tracking-tight text-[#f5f0e8]">
          <AmagetLogo />
        </span>
        <button
          className="w-9 h-9 rounded-full border border-white/10 text-[#999] flex items-center justify-center hover:bg-[#e85d2f]/15 hover:border-[#e85d2f] hover:text-[#e85d2f] transition-all duration-200"
          onClick={() => setOpenAction(false)}
        >
          ✕
        </button>
      </div>

      {/* Nav Links */}
      <nav className="px-4 py-5 border-b border-white/[0.06] space-y-1">
        {NavLinksForSidebar.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#aaa] text-[13.5px] font-medium hover:bg-white/[0.05] hover:text-[#f5f0e8] transition-all duration-200"
          >
            <Icon className="text-[15px] opacity-70" />

            {label}
          </Link>
        ))}
      </nav>

      {/* Categories */}
      <div className="flex-1 overflow-auto px-4 py-5 scroll">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#555] px-3 mb-3">
          Product Categories
        </p>

        {CategoriesForSidebar.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl border border-transparent mb-0.5 hover:bg-white/[0.04] hover:border-white/[0.06] group transition-all duration-200"
          >
            <Icon className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[17px] text-[#bbb] shrink-0 group-hover:bg-[#e85d2f]/15 group-hover:text-[#fc0056] transition-all duration-200" />
            <span className="text-[13.5px] font-medium text-[#ccc] group-hover:text-[#f5f0e8] transition-colors duration-200">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#e0dbd3] truncate">
            John Doe
          </p>
          <p className="text-[11px] text-[#555] mt-0.5">Customer</p>
        </div>
        <button className="text-[#555] hover:text-[#aaa] transition-colors">
          Sign out
        </button>
      </div>
    </aside>
  );
}

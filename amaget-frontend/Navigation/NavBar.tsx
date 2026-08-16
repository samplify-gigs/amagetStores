"use client";

import { UserIcon } from "@/components/Navbar/UserIcon";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { NavHamburger } from "@/components/Navbar/NavHamburger";
import { AmagetLogo } from "@/components/Navbar/amagetLogo";
import { CiSearch } from "react-icons/ci";
import { NavSearch } from "@/components/Navbar/Navseach";
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export function Navbar() {
  const input = "";
  return (
    <nav className="w-full">
      {/** top bar for lg */}
      <div className=" hidden lg:flex gap-4 w-full bg-white border-b border-gray-200 shadow-lg justify-center text-gray-600 p-2 text-xs items-center">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center ml-3">
            <IoIosCall size={12} className="text-[#fc0056] ml-8" />
            <span>+2349062020093</span>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineEmail size={12} className="text-[#fc0056]" />
            <span>sales@amaget.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 border-r border-primary">
          <FaLocationDot size={12} className="text-[#fc0056]" />
          <span>Ikeja Lagos</span>
        </div>
        <div className="flex items-center gap-2 px-2 border-r border-primary">
          <span>Lekki Lagos</span>
        </div>

        <div className="flex items-center gap-2 px-2">
          <span>Wuse 2 Abuja</span>
        </div>
      </div>
      <div className="bg-primary w-full shadow-xs md:p-3">
        {/** mobile layout */}
        <div className=" flex justify-between items-center px-4 pt-3 pb-2 sm:hidden md:hidden lg:hidden">
          {/** top left side for mobile */}
          <div className="flex items-center gap-1 justify-center">
            <NavHamburger />
            <AmagetLogo />
          </div>

          {/* top right side for mobile */}
          <div className="flex items-center gap-2">
            {/* User */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors"
            >
              <UserIcon className="h-5 w-5 cursor-pointer" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors"
            >
              <IoCartOutline size={22} className="cursor-pointer" />

              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                4
              </span>
            </Link>
          </div>
        </div>
        {/** search for mobile */}
        <div className="px-4 pb-3.5 sm:hidden md:hidden lg:hidden">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <CiSearch size={20} />
            </span>
            <NavSearch
              value={input}
              onChange={(value) => handlesearch(value)}
            />
          </div>
        </div>

        {/** tablet layout */}
        <div className="hidden sm:flex lg:hidden items-center gap-4 px-6 py-3">
          <NavHamburger size={21} />
          <AmagetLogo
            width={110}
            height={36}
            className="h-8 w-auto object-contain flex-shrink-0 drop-shadow-md"
          />
          {/* middle side for tabs */}

          <div className="relative flex items-center flex-1 max-w-2xl mx-auto">
            <span className="absolute right-3.5 text-gray-400 pointer-events-none">
              <CiSearch size={20} />
            </span>
            <NavSearch
              value={input}
              onChange={(value) => handlesearch(value)}
            />
          </div>

          {/* right side for tabs*/}

          <div className="flex items-center gap-1 flex-shrink-0">
            <UserIcon />
            <Link href="/cart">
              <button className="p-2 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer">
                <IoCartOutline size={22} />
              </button>
            </Link>
          </div>
        </div>

        {/** Desktop layout */}

        <div className="hidden lg:flex items-center justify-between px-8 py-3 gap-6 ">
          {/* left side for desktop */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <AmagetLogo
              width={140}
              height={44}
              className="h-auto w-auto object-contain flex-shrink-0 drop-shadow-md"
            />
          </div>

          {/* middle side for desktop */}
          <div className="relative flex items-center w-full max-w-3xl shadow-sm shadow-[#e0004c] ">
            <span className="absolute left-0 right-0 ml-2">
              <CiSearch size={22} className="text-gray-400 font-semibold" />
            </span>
            <NavSearch
              value={input}
              onChange={(value) => handlesearch(value)}
              className="w-full bg-white text-black text-sm placeholder-gray-400
              pl-10 pr-4 py-2.5 rounded-xl
              focus:outline-none 
              shadow-inner transition-all border-3 border-white"
            />

            <div
              className="absolute right-0 top-0 bottom-0
              bg-primary scale-97
              px-5 py-2.5 rounded-xl
              transition-all duration-150
              flex items-center justify-center cursor-pointer text-secondary font-semibold"
            >
              Search
            </div>
          </div>

          {/* right side for desktop */}

          <div className="flex gap-4 items-center mr-4">
            <div className="flex gap-3 items-center">
              <span className="text-secondary/90">Account</span>
              <UserIcon className="text-secondary/90" />
            </div>

            <Link href="/cart">
              <button className="p-2 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors mr-4np cursor-pointer">
                <IoCartOutline size={22} className="text-secondary/90" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

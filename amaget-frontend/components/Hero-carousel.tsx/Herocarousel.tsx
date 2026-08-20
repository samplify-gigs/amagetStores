"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselItem,
  CarouselPrevious,
} from "../../components-utils/carousels-utils/carousel";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TfiMobile } from "react-icons/tfi";
import { IoIosLaptop, IoIosDesktop, IoIosArrowDropright } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { LuPrinter, LuCctv } from "react-icons/lu";
import { IoMdDesktop } from "react-icons/io";
import { FiHeadphones } from "react-icons/fi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import {
  MdOutlineBlender,
  MdAddToHomeScreen,
  MdOutlineSolarPower,
  MdSignalWifiStatusbar1Bar,
  MdOutlineArrowRight,
} from "react-icons/md";
import { FaCamera, FaServer } from "react-icons/fa";

const HeroImages = [
  {
    src: "/main-banner.jpg",
    alt: " Hero main  banner 1",
  },
  {
    src: "/MAIN-BANNER-3.jpg",
    alt: "Hero main  banner 2",
  },
  {
    src: "/MAIN-BANNER-4.jpg",
    alt: " Hero main  banner 3",
  },
  {
    src: "/MAIN-BANNER-1.jpg",
    alt: " Hero main  banner 4",
  },
  {
    src: "/MAIN-BANNER-2.jpg",
    alt: " Hero main  banner 5",
  },
];

const Categories = [
  { icon: <TfiMobile />, label: "Phones & Tablets", href: "#" },
  { icon: <IoIosLaptop />, label: "Laptops", href: "#" },
  { icon: <IoIosDesktop />, label: "Desktops", href: "#" },
  { icon: <LuPrinter />, label: "Printers", href: "#" },
  { icon: <IoMdDesktop />, label: "Monitors", href: "#" },
  { icon: <FiHeadphones />, label: "Accessories", href: "#" },
  { icon: <PiTelevisionSimpleBold />, label: "Electronics", href: "#" },
  { icon: <IoGameController />, label: "Gaming", href: "#" },
  { icon: <MdOutlineBlender />, label: "Home Appliances", href: "#" },
  { icon: <MdAddToHomeScreen />, label: "Phone Parts", href: "#" },
  { icon: <MdOutlineSolarPower />, label: "Power & Backup", href: "#" },
  { icon: <FaCamera />, label: "Camera & Lenses", href: "#" },
  { icon: <LuCctv />, label: "CCTV & Security", href: "#" },
  { icon: <FaServer />, label: "Servers", href: "#" },
  {
    icon: <MdSignalWifiStatusbar1Bar />,
    label: "Internet & Networking",
    href: "#",
  },
];

const PromoCards = [
  {
    icon: <IoGameController className="text-2xl" />,
    title: "Gaming",
    sub: "Shop the latest games & gear",
    badge: "bg-emerald-500",
  },
  {
    icon: <TfiMobile className="text-2xl" />,
    title: "Phones",
    sub: "Hottest devices, best prices",
    badge: "bg-blue-500",
  },
  {
    icon: <IoIosLaptop className="text-2xl" />,
    title: "Laptops",
    sub: "Latest specs, delivered fast",
    badge: "bg-rose-500",
  },
];

export function HeroCarousel() {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: false }),
    [],
  );

  const mobilePlugin = React.useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: false }),
    [],
  );
  return (
    <div className="w-full mt-29 lg:mt-33">
      {/** mobile and tabs layout */}
      <Carousel
        plugins={[mobilePlugin]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full lg:hidden"
        onMouseEnter={plugin.stop}
        onMouseLeave={plugin.reset}
      >
        <CarouselContent className="-ml-0">
          {HeroImages.map((image) => (
            <CarouselItem key={image.alt} className="pl-0 basis-full">
              <div
                className="
                  relative
                  w-full
                  h-[200px]
                  sm:h-[280px]
                  md:h-[380px]
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.src === "/main-banner.jpg"}
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden " />
        <CarouselNext className="hidden " />
      </Carousel>

      {/** for lg */}
      <div className="hidden lg:flex justify-center gap-1 h-[420px] xl:h-[460px] max-w-[1400px] w-full mx-auto">
        {/* ── LEFT: Categories panel ─────────────────────────────── */}
        <aside className="w-[180px] xl:w-[200px] shrink-0 bg-white flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-primary border-b border-white/5">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white">
              All Categories
            </span>
          </div>

          {/* Scrollable list */}
          <ul className="flex-1 overflow-y-auto scrollbar py-1">
            {Categories.map(({ icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="
                  flex items-center gap-3 px-4 py-[9px]
                  text-gray-600 text-[13px]
                  hover:bg-[#fc0056]/10 hover:text-white
                  hover:pl-5
                  transition-all duration-150 ease-out
                  border-b border-white/[0.03]
                  group
                "
                >
                  <span className="text-[#7EB8C9] text-[15px] shrink-0 group-hover:scale-110 transition-transform duration-150">
                    {icon}
                  </span>
                  <span className="truncate leading-tight">{label}</span>
                  {/* subtle right arrow on hover */}
                  <span className="ml-auto text-[10px] text-gray-600 group-hover:text-[#7EB8C9] transition-colors opacity-0 group-hover:opacity-100">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── CENTER: Hero Carousel ──────────────────────────────── */}
        <div className="flex-1 min-w-0 relative overflow-hidden">
          <Carousel
            plugins={[plugin]}
            opts={{ align: "start", loop: true }}
            className="w-full h-full"
            onMouseEnter={plugin.stop}
            onMouseLeave={plugin.reset}
          >
            <CarouselContent className="-ml-0">
              {HeroImages.map(({ alt, src }, i) => (
                <CarouselItem key={alt} className="pl-0 basis-full">
                  <div className="relative w-full h-[420px] xl:h-[460px]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="1024px"
                      quality={92}
                      className="object-cover object-center"
                    />
                    {/* subtle gradient overlay bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrow buttons — floating inside the image */}
            <CarouselPrevious className="hidden left-3 bg-black/40 hover:bg-black/70 border-none text-white backdrop-blur-sm" />
            <CarouselNext className=" hiddenright-3 bg-black/40 hover:bg-black/70 border-none text-white backdrop-blur-sm" />
          </Carousel>
        </div>

        {/* ── RIGHT: Promo stack ────────────────────────────────── */}
        <div className="w-[180px] xl:w-[200px] shrink-0 flex flex-col gap-0  overflow-hidden bg-white">
          {PromoCards.map(({ icon, title, sub, badge }, i) => (
            <Link
              key={title}
              href="#"
              className={`
              flex-1 flex flex-col justify-between p-4
              hover:bg-gray-100
              transition-all duration-200
              border-b border-white/5 last:border-b-0
              group relative overflow-hidden
            `}
            >
              {/* glowing dot accent */}
              <span
                className={`absolute top-3 right-3 w-2 h-2 rounded-full ${badge} opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200`}
              />

              <span className="text-[#7EB8C9] group-hover:scale-110 transition-transform duration-200 w-fit">
                {icon}
              </span>

              <div>
                <p className="text-gray-600 font-semibold text-[13px] leading-tight">
                  {title}
                </p>
                <p className="text-gray-400 text-[11px] mt-0.5 leading-snug group-hover:text-gray-300 transition-colors">
                  {sub}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] font-bold tracking-widest uppercase text-[#7EB8C9] group-hover:tracking-[0.2em] transition-all duration-200">
                  <div className="text-gray-600">Shop </div>
                  <div>
                    {" "}
                    <MdOutlineArrowRight className="text-[#fc0056] text-[20px]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

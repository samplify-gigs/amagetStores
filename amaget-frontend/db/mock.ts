import { HotItems } from "@/components/Hot-sales-carousel/hot-sales";
import { TfiMobile } from "react-icons/tfi";
import { IoIosLaptop } from "react-icons/io";
import { IoMdDesktop } from "react-icons/io";
import { LuPrinter, LuCctv } from "react-icons/lu";
import { FiHeadphones } from "react-icons/fi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import {
  MdOutlineBlender,
  MdAddToHomeScreen,
  MdOutlineSolarPower,
  MdSignalWifiStatusbar1Bar,
} from "react-icons/md";
import { FaCamera, FaServer } from "react-icons/fa";

export const products: HotItems[] = [
  {
    id: 4555,
    url: "/Lifestyle/airpods pro.webp",
    name: "airpods pro",
    price: 50000,
    category: "accessories",
  },
  {
    id: 4558,
    url: "/Lifestyle/apple watch series 10.webp",
    name: "apple watch series 10",
    price: 600000,
    category: "accessories",
  },
  {
    id: 4559,
    url: "/Lifestyle/Latima solar powerbank.jpg",
    name: "Latima solar powerbank",
    price: 710000,
    category: "power & backup",
  },
  {
    id: 5001,
    url: "/Lifestyle/Led lightning.webp",
    name: "Led lightning",
    price: 50000,
    category: "accessories",
  },
  {
    id: 5002,
    url: "/Lifestyle/nova 5.jpg",
    name: " nova 5",
    price: 50000,
    category: "phones",
  },
  {
    id: 5004,
    url: "/Lifestyle/Onyx sydio 9.webp",
    name: " Onyx sydio 9",
    price: 77000,
    category: "accessories",
  },
  {
    id: 5006,
    url: "/Lifestyle/ORNARTO Compatible with iPhone 17 Pro Max Case 6.9, Slim Liquid.jpg",
    name: " ORNARTO Compatible with iPhone 17 Pro Max Case",
    price: 500000,
    category: "phone",
  },
  ,
  {
    id: 5008,
    url: "/Lifestyle/Samsung charger.webp",
    name: " Hero main  banner 5",
    price: 55000,
    category: "accessories",
  },
];

export const Categories = [
  { icon: TfiMobile, label: "Phones & Tablets", href: "#" },
  { icon: IoIosLaptop, label: "Laptops", href: "#" },
  { icon: IoMdDesktop, label: "Desktops & Monitors", href: "#" },
  { icon: LuPrinter, label: "Printers", href: "#" },
  { icon: FiHeadphones, label: "Accessories", href: "#" },
  { icon: PiTelevisionSimpleBold, label: "Electronics", href: "#" },
  { icon: IoGameController, label: "Gaming", href: "#" },
  { icon: MdOutlineBlender, label: "Home Appliances", href: "#" },
  { icon: MdAddToHomeScreen, label: "Phone Parts", href: "#" },
  { icon: MdOutlineSolarPower, label: "Power & Backup", href: "#" },
  { icon: FaCamera, label: "Camera & Lenses", href: "#" },
  { icon: LuCctv, label: "CCTV & Security", href: "#" },
  { icon: FaServer, label: "Servers", href: "#" },
  {
    icon: MdSignalWifiStatusbar1Bar,
    label: "Internet & Networking",
    href: "#",
  },
];

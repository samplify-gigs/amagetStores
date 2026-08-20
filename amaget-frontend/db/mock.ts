import { TfiMobile } from "react-icons/tfi";
import { IoIosDesktop, IoIosLaptop } from "react-icons/io";
import { IoMdDesktop } from "react-icons/io";
import { LuPrinter, LuCctv } from "react-icons/lu";
import { FiHeadphones, FiHome, FiPackage, FiUser } from "react-icons/fi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import {
  MdOutlineBlender,
  MdAddToHomeScreen,
  MdOutlineSolarPower,
  MdSignalWifiStatusbar1Bar,
} from "react-icons/md";
import { FaCamera, FaServer } from "react-icons/fa";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

export type upgrade = {
  id: number;
  name: string;
  price: number | string;
  url: string;
  slug: string;
  category: string;
};

export type NavBarprops = {
  open: boolean;
  setOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
  query?: string;
  products?: Products[];
  session?: Session | null;
};

export const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Customer Support", href: "#" },
  { label: "Visit Your Account", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export const SOCIAL_LINKS = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaXTwitter, label: "X / Twitter", href: "#" },
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaTiktok, label: "TikTok", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

export const BnplItems = [
  {
    src: "/Lifestyle/airpods pro.webp",
    alt: "airpods pro",
    price: "300000",
  },
  {
    src: "/Lifestyle/apple watch series 10.webp",
    alt: "apple watch series 10",
    price: "700000",
  },
  {
    src: "/Lifestyle/Latima solar powerbank.jpg",
    alt: "Latima solar powerbank",
    price: "20000000",
  },
  {
    src: "/Lifestyle/Led lightning.webp",
    alt: "Led lightning",
    price: "1500000",
  },
  {
    src: "/Lifestyle/nova 5.jpg",
    alt: "nova 5",
    price: "950000",
  },
  {
    src: "/Lifestyle/Onyx sydio 9.webp",
    alt: "Onyx sydio 9",
    price: "980000",
  },
  {
    src: "/Lifestyle/ORNARTO Compatible with iPhone 17 Pro Max Case 6.9, Slim Liquid.jpg",
    alt: "ORNARTO Compatible with iPhone 17 Pro Max Case 6.9, Slim Liquid",
    price: "35000",
  },
  {
    src: "/Lifestyle/Samsung charger.webp",
    alt: "Samsung charger",
    price: "45000",
  },

  {
    src: "/upgrade pc/CUSTOM COMPUTER PC Intel i5-14400 8GB RAM RX 6500 XT 512GB NVMe MM9.45.51.webp",
    alt: "CUSTOM COMPUTER PC Intel i5-14400 8GB RAM RX 6500 XT 512GB NVMe",
    price: "1200000",
  },
  {
    src: "/upgrade pc/DELL Core i, 500GB Pre Loaded Window 10 & Office 16.jpg",
    alt: "DELL Core i5, 500GB Pre Loaded Window 10 & Office 16",
    price: "700000",
  },
  {
    src: "/upgrade pc/High End Gaming PC,RTX 5060,Intel i9-11900F,32GB RAM,1TB SSD,WIN11,9ARGB.webp",
    alt: "High End Gaming PC,RTX 5060,Intel i9-11900F,32GB RAM,1TB SSD",
    price: "20000000",
  },
  {
    src: "/upgrade pc/Hp 16-au0019st OmniBook 7 Flip 2-in-1 Laptop  16Touch  Ultra 9 288V 32GB RAM  1TB SSDBacklit KB.jpg",
    alt: "Hp 16-au0019st OmniBook 7 Flip 2-in-1 Laptop  16Touch  Ultra 9",
    price: "1500000",
  },
  {
    src: "/upgrade pc/Hp VICTUS 15 GAMING 13TH GEN INTEL CORE I5 16GB RAM 512GB SSD RTX 4050 (6GB).jpg",
    alt: "Hp VICTUS 15 GAMING 13TH GEN INTEL CORE I5 16GB RAM 512GB SSD RTX 4050",
    price: "950000",
  },
  {
    src: "/upgrade pc/Hp VICTUS GAMING 16 12TH GEN INTEL CORE I7 16GB RAM 1TB SSD GTX 1650 (4GB) WINS 11.jpg",
    alt: "Hp VICTUS GAMING 16 12TH GEN INTEL CORE I7 16GB RAM 1TB SSD GTX 1650",
    price: "980000",
  },
  {
    src: "/upgrade pc/Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD 500GB HDD 24LED NVIDIA 1030 RGBK&M.webp",
    alt: "Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD 500GB HDD 24LED NVIDIA 1030",
    price: "3200000",
  },
  {
    src: "/upgrade pc/OmniBook Ultra Flip.jpg",
    alt: "omniBook Ultra Flip",
    price: "1620000",
  },
];

export const products = [
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

export const upgradeItems = [
  {
    id: 4555,
    name: "CUSTOM COMPUTER PC Intel i5-14400",
    price: 500000,
    url: "/upgrade pc/CUSTOM COMPUTER PC Intel i5-14400 8GB RAM RX 6500 XT 512GB NVMe MM9.45.51.webp",
    slug: "CUSTOM COMPUTER PC Intel i5-14400",
    category: "computing",
  },
  {
    id: 4556,
    name: "DELL Core i, 500GB Pre Loaded Window 10 & Office",
    price: 670000,
    url: "/upgrade pc/DELL Core i, 500GB Pre Loaded Window 10 & Office 16.jpg",
    slug: "DELL Core i, 500GB Pre Loaded Window 10 & Office",
    category: "computing",
  },
  {
    id: 4557,
    name: "High End Gaming PC,RTX 5060,Intel i9-11900F",
    price: 500000,
    url: "/upgrade pc/High End Gaming PC,RTX 5060,Intel i9-11900F,32GB RAM,1TB SSD,WIN11,9ARGB.webp",
    slug: "High End Gaming PC,RTX 5060,Intel i9-11900F",
    category: "computing",
  },
  {
    id: 4558,
    name: "Hp 16-au0019st OmniBook 7 Flip 2-in-1 Laptop",
    price: 1200000,
    url: "/upgrade pc/Hp 16-au0019st OmniBook 7 Flip 2-in-1 Laptop  16Touch  Ultra 9 288V 32GB RAM  1TB SSDBacklit KB.jpg",
    slug: "Hp 16-au0019st OmniBook 7 Flip 2-in-1 Laptop",
    category: "computing",
  },
  {
    id: 4559,
    name: "Hp VICTUS 15 GAMING 13TH GEN INTEL CORE I5",
    price: 700000,
    url: "/upgrade pc/Hp VICTUS 15 GAMING 13TH GEN INTEL CORE I5 16GB RAM 512GB SSD RTX 4050 (6GB).jpg",
    slug: "Hp VICTUS 15 GAMING 13TH GEN INTEL CORE I5CUSTOM COMPUTER PC Intel i5-14400",
    category: "computing",
  },
  {
    id: 5000,
    name: "Hp VICTUS GAMING 16 12TH GEN INTEL ",
    price: 900000,
    url: "/upgrade pc/Hp VICTUS GAMING 16 12TH GEN INTEL CORE I7 16GB RAM 1TB SSD GTX 1650 (4GB) WINS 11.jpg",
    slug: "Hp VICTUS GAMING 16 12TH GEN INTEL ",
    category: "computing",
  },
  {
    id: 5001,
    name: "Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD ",
    price: 900000,
    url: "/upgrade pc/Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD 500GB HDD 24LED NVIDIA 1030 RGBK&M.webp",
    slug: "Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD ",
    category: "computing",
  },
  {
    id: 5002,
    name: "OmniBook Ultra Flip",
    price: 900000,
    url: "/upgrade pc/OmniBook Ultra Flip.jpg",
    slug: "Lenovo RGB Gaming PC i5-8th 32GB RAM 1TB SSD ",
    category: "computing",
  },
];

export const LifestyleItems = [
  { src: "/Lifestyle/airpods pro.webp", alt: "AirPods Pro", price: "300000" },
  {
    src: "/Lifestyle/apple watch series 10.webp",
    alt: "Apple Watch Series 10",
    price: "700000",
  },
  {
    src: "/Lifestyle/Latima solar powerbank.jpg",
    alt: "Latima Solar Powerbank",
    price: "20000",
  },
  {
    src: "/Lifestyle/Led lightning.webp",
    alt: "LED Lightning Cable",
    price: "15000",
  },
  { src: "/Lifestyle/nova 5.jpg", alt: "Nova 5", price: "95000" },
  {
    src: "/Lifestyle/Onyx sydio 9.webp",
    alt: "Onyx Studio 9",
    price: "98000",
  },
  {
    src: "/Lifestyle/ORNARTO Compatible with iPhone 17 Pro Max Case 6.9, Slim Liquid.jpg",
    alt: "iPhone 17 Pro Max Case",
    price: "35000",
  },
  {
    src: "/Lifestyle/Samsung charger.webp",
    alt: "Samsung Fast Charger",
    price: "14500",
  },
];

export const CategoriesForSidebar = [
  { icon: TfiMobile, label: "Phones & Tablet", href: "/phones-tablets" },
  { icon: IoIosLaptop, label: "Laptops", href: "/laptops" },
  { icon: IoIosDesktop, label: "Desktops", href: "/printers" },
  { icon: LuPrinter, label: "Printers", href: "/printers" },
  {
    icon: IoMdDesktop,
    label: "Desktops & Monitors",
    href: "/desktop-monitors",
  },
  { icon: FiHeadphones, label: "Accessories", href: "/accessories" },
  {
    icon: PiTelevisionSimpleBold,
    label: "Electronics",
    href: "/electronics",
  },
  { icon: IoGameControllerOutline, label: "Gaming", href: "/gaming" },
  {
    icon: MdOutlineBlender,
    label: "Home-appliances",
    href: "/home-appliances",
  },
  { icon: MdAddToHomeScreen, label: "Phone Parts", href: "/phone-parts" },
  {
    icon: MdOutlineSolarPower,
    label: "Power & Backup",
    href: "/power-backup",
  },
  { icon: FaCamera, label: "Camera & Lenses", href: "/camera-lenses" },
  { icon: LuCctv, label: "CCTV & Security", href: "/cctv-security" },
  { icon: FaServer, label: "Servers", href: "/servers" },
  {
    icon: MdSignalWifiStatusbar1Bar,
    label: "Internet & Networking",
    href: "/internetandnetworking",
  },
];

export const NavLinksForSidebar = [
  { icon: FiHome, label: "amaget Home", href: "/" },
  { icon: FiUser, label: "My Account", href: "/account" },
  { icon: FiPackage, label: "My Orders", href: "/orders" },
];

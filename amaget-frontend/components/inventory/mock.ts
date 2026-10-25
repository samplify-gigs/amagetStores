// Static mock data for the dashboard design. Replace with real data later.
export type StoreName = "Ikeja" | "Lekki" | "Abuja";
export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
export type Category = "Smartphones" | "Laptops" | "Tablets" | "Accessories";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: Category;
  brand: string;
  description: string;
  price: number;
  regularPrice?: number;
  stock: number;
  status: StockStatus;
  store: StoreName;
  addedDate: string;
  addedTime: string;
  updatedAt: string;
};

export const mockStats = { total: 128, inStock: 96, lowStock: 21, outOfStock: 11 };

const base = { store: "Ikeja" as const, updatedAt: "20 Oct 2026, 2:15 PM" };

export const mockProducts: Product[] = [
  { ...base, id: "1", name: "iPhone 15 Pro 256GB", sku: "PH-IP15P-256", category: "Smartphones", brand: "Apple", description: "6.1-inch display, A17 Pro chip, titanium frame. Natural Titanium.", price: 1450000, regularPrice: 1520000, stock: 14, status: "in-stock", addedDate: "12 Oct 2026", addedTime: "9:40 AM" },
  { ...base, id: "2", name: "Samsung Galaxy S24 Ultra", sku: "PH-SGS24U-512", category: "Smartphones", brand: "Samsung", description: "6.8-inch display, 512GB storage, built-in S Pen.", price: 1380000, stock: 3, status: "low-stock", addedDate: "10 Oct 2026", addedTime: "11:05 AM" },
  { ...base, id: "3", name: "MacBook Air M2 13-inch", sku: "LP-MBA-M2-256", category: "Laptops", brand: "Apple", description: "8GB memory, 256GB SSD, all-day battery.", price: 1950000, stock: 6, status: "in-stock", addedDate: "08 Oct 2026", addedTime: "2:30 PM" },
  { ...base, id: "4", name: "Dell XPS 13 Plus", sku: "LP-DXPS13-512", category: "Laptops", brand: "Dell", description: "Intel Core i7, 16GB memory, 512GB SSD.", price: 1720000, stock: 0, status: "out-of-stock", addedDate: "03 Oct 2026", addedTime: "10:15 AM" },
  { ...base, id: "5", name: "iPad 10th Generation 64GB", sku: "TB-IPAD10-64", category: "Tablets", brand: "Apple", description: "10.9-inch Liquid Retina display, Wi-Fi.", price: 520000, stock: 11, status: "in-stock", addedDate: "01 Oct 2026", addedTime: "4:20 PM" },
  { ...base, id: "6", name: "Samsung Galaxy Tab S9", sku: "TB-SGTS9-128", category: "Tablets", brand: "Samsung", description: "11-inch AMOLED display, 128GB storage.", price: 640000, stock: 2, status: "low-stock", addedDate: "28 Sep 2026", addedTime: "1:00 PM" },
  { ...base, id: "7", name: "AirPods Pro (2nd generation)", sku: "AC-APP2-USBC", category: "Accessories", brand: "Apple", description: "Active noise cancellation, USB-C charging case.", price: 245000, stock: 25, status: "in-stock", addedDate: "25 Sep 2026", addedTime: "9:10 AM" },
  { ...base, id: "8", name: "Anker 20,000mAh Power Bank", sku: "AC-ANK20K", category: "Accessories", brand: "Anker", description: "Fast-charging power bank with two USB ports.", price: 38500, stock: 0, status: "out-of-stock", addedDate: "20 Sep 2026", addedTime: "3:45 PM" },
];
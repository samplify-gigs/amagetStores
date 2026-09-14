export interface CartItem {
  id: string;
  image: string;
  name: string;
  variation?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  quantity: number;
}

export const cartItems: CartItem[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/headphones/400/400",
    name: "Wireless Over-Ear Headphones with Active Noise Cancellation",
    variation: "Color: Matte Black",
    price: 45100,
    originalPrice: 60700,
    currency: "₦",
    quantity: 1,
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/smartwatch/400/400",
    name: "Fitness Smartwatch - Heart Rate & Sleep Tracking, 1.4in AMOLED",
    variation: "Size: 44mm · Band: Silicone",
    price: 28200,
    originalPrice: 36667,
    currency: "₦",
    quantity: 2,
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/backpack/400/400",
    name: "Water-Resistant Laptop Backpack, Fits up to 15.6in",
    price: 12500,
    currency: "₦",
    quantity: 1,
  },
];

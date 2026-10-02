import {
  IoBusinessOutline,
  IoCardOutline,
  IoCarOutline,
  IoCashOutline,
  IoFlashOutline,
  IoStorefrontOutline,
  IoSwapHorizontalOutline,
  IoWalletOutline,
} from "react-icons/io5";

export type StateRow = {
  id: number;
  name: string;
  code: string;
};

export type LocationRow = {
  id: number;
  state_id: number;
  name: string;
  address: string;
};

export const mockStates: StateRow[] = [
  { id: 1, name: "Lagos", code: "LA" },
  { id: 2, name: "Abuja (FCT)", code: "FC" },
  { id: 3, name: "Rivers", code: "RV" },
  { id: 4, name: "Oyo", code: "OY" },
];

export const mockLocations: LocationRow[] = [
  {
    id: 1,
    state_id: 1,
    name: "Ikeja",
    address: "14 Allen Avenue, Ikeja, Lagos",
  },
  {
    id: 2,
    state_id: 1,
    name: "Lekki Phase 1",
    address: "Block 12 Admiralty Way, Lekki Phase 1, Lagos",
  },
  {
    id: 3,
    state_id: 1,
    name: "Surulere",
    address: "22 Adeniran Ogunsanya St, Surulere, Lagos",
  },
  {
    id: 4,
    state_id: 2,
    name: "Wuse 2",
    address: "Plot 45 Aminu Kano Crescent, Wuse 2, Abuja",
  },
  {
    id: 5,
    state_id: 2,
    name: "Garki",
    address: "10 Ahmadu Bello Way, Garki, Abuja",
  },
  {
    id: 6,
    state_id: 3,
    name: "GRA Phase 2",
    address: "5 Aba Road, GRA Phase 2, Port Harcourt",
  },
  {
    id: 7,
    state_id: 4,
    name: "Bodija",
    address: "18 Awolowo Avenue, Bodija, Ibadan",
  },
];

export const mockOrderItems = [
  {
    id: "21949",
    name: "Samsung Galaxy Note 9 128gb, London Used",
    price: 147.0,
    quantity: 2,
  },
  {
    id: "18332",
    name: "Anker PowerCore 10000 Portable Charger",
    price: 22.5,
    quantity: 1,
  },
];

// ---------- Types ----------

export type DeliveryOptionId = "pod" | "pickup" | "instant" | "standard";
export type PaymentMethodId = "card" | "paystack" | "transfer" | "cdl";

interface DeliveryOption {
  id: DeliveryOptionId;
  label: string;
  description: string;
  eta: string;
  fee: number;
  icon: typeof IoCashOutline;
}

export const FAST_STATE_CODES = ["LA", "FC"]; // Lagos & Abuja

export const fastDeliveryOptions: DeliveryOption[] = [
  {
    id: "pod",
    label: "Pay on delivery",
    description: "For orders below ₦500,000",
    eta: "1–2 business days",
    fee: 1000,
    icon: IoCashOutline,
  },
  {
    id: "pickup",
    label: "Pickup at store",
    description: "No extra charges",
    eta: "Ready within 24hrs",
    fee: 0,
    icon: IoStorefrontOutline,
  },
  {
    id: "instant",
    label: "Instant delivery",
    description: "Delivered same day",
    eta: "2–4 hours",
    fee: 5000,
    icon: IoFlashOutline,
  },
];

export const standardDeliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "Delivered to your address",
    eta: "Arrives in 24–48hrs",
    fee: 2500,
    icon: IoCarOutline,
  },
];

export const paymentMethods: {
  id: PaymentMethodId;
  label: string;
  sublabel: string;
  icon: typeof IoCardOutline;
}[] = [
  {
    id: "card",
    label: "Pay with card",
    sublabel: "Visa, Mastercard, Verve",
    icon: IoCardOutline,
  },
  {
    id: "paystack",
    label: "Paystack",
    sublabel: "Checkout via Paystack",
    icon: IoWalletOutline,
  },
  {
    id: "transfer",
    label: "Bank transfer",
    sublabel: "Direct to our account",
    icon: IoSwapHorizontalOutline,
  },
  {
    id: "cdl",
    label: "Credit Direct Limited",
    sublabel: "Pay later with CDL",
    icon: IoBusinessOutline,
  },
];

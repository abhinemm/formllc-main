import { UNVERIFIED, VERIFIED } from "@/constants/constants";

export const SideMenuHelper = (contextOptions: any) => {
  let menu: any = [];
  if (contextOptions?.regPaymentStatus && contextOptions?.status === 1) {
    menu = VERIFIED;
  } else {
    menu = UNVERIFIED;
  }

  return menu;
};

export const getFileExtensionFromUrl = (url: string) => {
  return url.split(".").pop()?.split("?")[0] || "jpg";
};

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateFixedTransactionId(): string {
  const prefix = "TRNS-";
  const timestamp = Date.now().toString(36).toUpperCase(); // timestamp base36

  const randomLength = 16 - timestamp.length;
  const randomPart = [...Array(randomLength)]
    .map(() => Math.random().toString(36)[2])
    .join("")
    .toUpperCase();

  return `${prefix}${randomPart}${timestamp}`;
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Mar"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

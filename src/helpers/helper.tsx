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

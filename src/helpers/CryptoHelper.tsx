import { enc } from "crypto-js";
import AES from "crypto-js/aes";

export const encryptURL = (str: string) => {
  try {
    const encryptedText = AES.encrypt(str, "Golden_123");
    return encodeURIComponent(encryptedText.toString());
  } catch (error) {
    console.log("the error in encryptedText", error);
    return null;
  }
};

export const decryptURL = (str: any) => {
  try {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, "Golden_123").toString(enc.Utf8);
  } catch (err) {
    console.log("the error decodedStr", err);
    return null;
  }
};

export const decryptToken = (str: any) => {
  try {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, "ThisIsASecretKey").toString(enc.Utf8);
  } catch (err) {
    console.log("the error decodedStr", err);
    return null;
  }
};

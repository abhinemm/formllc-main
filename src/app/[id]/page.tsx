"use client";
import React, { useEffect } from "react";
import Loader from "../../../components/Loader";
import { useParams, useRouter } from "next/navigation";
import { decryptURL } from "@/helpers/CryptoHelper";
import { setCookie } from "@/helpers/CookieHelper";

const page = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  useEffect(() => {
    if (id) {
      const userId = decryptURL(id);
      console.log("userIduserIduserIduserIduserId", userId);
      if (userId) {
        setCookie("referId", userId);
        router.push("/");
      } else {
        router.push("/");
      }
    }
  }, [id]);

  return <Loader />;
};

export default page;

import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { message } from "antd";
import { authOptions } from "../auth/[...nextauth]/route";
import { client } from "@/utils/fanbasis";

type Body = {
  url: string;
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const webhookSubscriptions = await client.subscribers.list();
    console.log("webhookSubscriptions", webhookSubscriptions);
    let data = webhookSubscriptions;
    let status: boolean = false;
    if (data?.status === "success") {
      status = true;
    }
    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://www.fanbasis.com/public-api/webhook-subscriptions",
    //   headers: {
    //     Accept: "application/json",
    //     "x-api-key": process.env.FORMLLC_API_KEY || "",
    //   },
    // };
    // let data = {};
    // let status: boolean = false;
    // await axios
    //   .request(config)
    //   .then((response) => {
    //     data = response.data;
    //     status = true;
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     status = false;
    //     data = { error: error };
    //     console.log(error);
    //   });

    if (status) {
      return NextResponse.json({ status: true, result: data }, { status: 200 });
    } else {
      return NextResponse.json(
        { status: false, result: data },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("errorerrorerror", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const data = (await getServerSession(authOptions)) as any;
    if (!data || !data.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    if (!body.url) {
      return NextResponse.json(
        { ok: false, error: "Url is required" },
        { status: 400 }
      );
    }
    let result: any = null;
    let reqBody = JSON.stringify({
      webhook_url: body.url,
      event_types: [
        "payment.succeeded",
        "subscription.created",
        "subscription.renewed",
        "subscription.completed",
        "subscription.canceled",
      ],
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.fanbasis.com/public-api/webhook-subscriptions",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": process.env.FORMLLC_API_KEY || "",
      },
      data: reqBody,
    };
    await axios
      .request(config)
      .then((response) => {
        result = response.data?.status;
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        result = false;
        console.log(error);
      });
    if (result) {
      return NextResponse.json(
        { received: true, result: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          received: false,
          message: "webhook creation failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("errorerrorerror", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

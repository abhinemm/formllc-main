import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Op, QueryTypes } from "sequelize";
import Payments from "@/models/payments.model";
import { UserTypesEnum } from "@/utils/constants";
import sequelize from "@/lib/sequelize";
import { generateFixedTransactionId } from "@/helpers/helper";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  if (
    data?.user?.type === UserTypesEnum.admin ||
    data?.user?.type === UserTypesEnum.manager
  ) {
    const typeFilter = searchParams.get("type");

    let sql = `
  SELECT 
    payments.*, 
    companies."companyName", 
    companies."type" AS "ctype"
  FROM 
    payments
  INNER JOIN 
    companies 
  ON 
    companies.id = payments."companyId"
`;

    const replacements: Record<string, any> = {};

    if (typeFilter) {
      sql += ` WHERE payments."type" = :typeFilter`;
      replacements.typeFilter = typeFilter;
    }

    const payments = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });
    return NextResponse.json(payments);
  }

  try {
    // const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};

    // Add default where condition for userId if not admin
    // if (adminUser?.id !== data.user.id) {
    //   const companies = await Company.findAll({
    //     where: { userId: data.user.id },
    //   });
    //   if (companies?.length) {
    //     where.companyId = {
    //       [Op.in]: companies.map((el) => el.id),
    //     };
    //   }
    // }
    searchParams.forEach((value, key) => {
      where[key] = value;
    });

    const payments = await Payments.findAll({
      where: where,
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    // --- Auth checks ---
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (
      session.user.type === UserTypesEnum.customer ||
      session.user.type === UserTypesEnum.member
    ) {
      return NextResponse.json(
        { message: "You don’t have permission to perform this action." },
        { status: 403 }
      );
    }

    // --- Body parsing ---
    const body = await req.json();

    // Accept both old & new field names from frontend and normalize
    const companyId = body.companyId;
    const paymentId = body.paymentId;
    const paymentDateRaw = body.paymentDate;

    const type = body.type ?? body.paymentType; // "oneTime" | "sub"
    const registrationState = body.registrationState ?? body.paymentFor ?? null;

    const status = body.status ?? body.paymentStatus ?? null;
    const description = body.description ?? null;

    const invoicePDF = body.invoicePDF ?? body.invoiceUrl ?? null;

    const currency = body.currency ?? null;

    const plan = body.plan ?? null;
    const buyerInfo = body?.buyerInfo ?? null;
    const webhookId = body?.webhookId ?? null;

    // --- Basic required fields validation ---
    if (
      !companyId ||
      !paymentId ||
      !paymentDateRaw ||
      !type ||
      !registrationState ||
      !status ||
      body.amount == null ||
      !currency
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const paymentDate: any = new Date(paymentDateRaw);
    if (isNaN(paymentDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid paymentDate format" },
        { status: 400 }
      );
    }

    // --- Prevent duplicate paymentId (optional but usually a good idea) ---
    const existingPayment: any = await Payments.findOne({
      where: { paymentId },
    });

    if (existingPayment) {
      return NextResponse.json(
        { message: "Payment with this paymentId already exists!" },
        { status: 400 }
      );
    }

    const transactionID = generateFixedTransactionId();

    // --- Create payment record ---
    const createdPayment = await Payments.create({
      companyId: Number(companyId),
      paymentId,
      transactionID,
      paymentDate,
      plan,
      registrationState,
      status,
      description,
      invoicePDF,
      amountPaid: Number(body.amount),
      type,
      buyerInfo,
      currency,
      webhookId,
      createdBy: 2,
    });

    return NextResponse.json(createdPayment, { status: 201 });
  } catch (error: any) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    // --- Auth checks ---
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (
      session.user.type === UserTypesEnum.customer ||
      session.user.type === UserTypesEnum.member
    ) {
      return NextResponse.json(
        { message: "You don’t have permission to perform this action." },
        { status: 403 }
      );
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const body = await req.json();

    const {
      companyId,
      paymentId,
      paymentDate,
      type,
      registrationState,
      status,
      description,
      amount,
      currency,
      plan,
      buyerInfo,
      webhookId,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Payment id is required" },
        { status: 400 }
      );
    }
    const payment: any = await Payments.findByPk(id);
    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }
    payment.companyId = companyId;
    payment.paymentId = paymentId;
    payment.type = type;
    payment.registrationState = registrationState;
    payment.status = status;
    payment.description = description;
    payment.amount = amount;
    payment.currency = currency;
    if (plan !== undefined) {
      payment.plan = plan;
    }
    if (buyerInfo !== undefined) {
      payment.buyerInfo = buyerInfo;
    }

    if (webhookId !== undefined) {
      payment.webhookId = webhookId;
    }

    if (paymentDate) {
      const paymentDateNew = new Date(paymentDate);

      if (isNaN(paymentDateNew.getTime())) {
        return NextResponse.json(
          { message: "Invalid paymentDate format" },
          { status: 400 }
        );
      }
      payment.paymentDate = paymentDateNew;
    }
    await payment.save();

    return NextResponse.json(payment, { status: 200 });
  } catch (error: any) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

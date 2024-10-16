"use server";

import { headers } from "next/headers";
import { stripePaymentObject } from "../lib/stripePayment";
import { redirect } from "next/navigation";
import { invoiceRepository } from "@/backend/repository";

export async function createPaymentAction(formData: FormData) {
  const headerList = await headers();
  const origin = headerList.get("origin");

  const id = parseInt(formData.get("id") as string);

  const result = await invoiceRepository.getInvoicesByIdAsync({
    invoiceId: id,
  });

  if (result.isErr()) throw new Error("Invoice not found");

  console.log(result);

  const session = await stripePaymentObject.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: result.value.value,
          product: "prod_R1jA5XRoSSt7Hl",
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/payment/invoices/${id}?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/invoices/${id}/status=canceled&session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.url) {
    throw new Error("Invalid session url");
  }

  redirect(session.url!);
}

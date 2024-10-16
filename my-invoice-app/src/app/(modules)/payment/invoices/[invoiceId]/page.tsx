import { notFound } from "next/navigation";
import Stripe from "stripe";
import { stripeConfig } from "@/config/env";
import { updateStatusAction } from "@/shared/actions/updateStatus.Action";
import PaymentPage from "../../_core/pages/PaymentsPage";
import { invoiceRepository } from "@/backend/repository";
import { IPaymentPageType } from "../../_core/types";
import { stripePaymentObject } from "../../_core/lib/stripePayment";

interface PaymentProps {
  params: Promise<{
    invoiceId: string;
  }>;
  searchParams: Promise<{
    status: string;
    session_id: string;
  }>;
}

export default async function Payment(props: PaymentProps) {
  const { invoiceId } = await props.params;

  const invoice_Id: number = parseInt(invoiceId);

  const searchParams = await props.searchParams;

  const sessionId = searchParams.session_id;
  const isSuccess = sessionId && searchParams.status === "success";
  const isCanceled = searchParams.status === "canceled";
  let isError = isSuccess && !sessionId;

  if (isSuccess) {
    const result = await stripePaymentObject.checkout.sessions.retrieve(
      sessionId
    );

    if (result.payment_status !== "paid") {
      isError = true;
    } else {
      const formData = new FormData();
      formData.append("id", String(invoiceId));
      formData.append("status", "paid");
      await updateStatusAction(formData);
    }
  }

  if (isNaN(invoice_Id)) {
    throw new Error("Invalid invoice id");
  }

  const result = await invoiceRepository.getInvoicesByIdAsync({
    invoiceId: invoice_Id!,
  });

  if (result.isErr()) {
    notFound();
  }

  return (
    <PaymentPage
      item={result.value as IPaymentPageType}
      isError={isError}
      isCanceled={isCanceled}
    />
  );
}

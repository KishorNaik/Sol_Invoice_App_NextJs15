import { db } from "@/backend/db";
import { Customers, Invoices } from "@/backend/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { invoiceRepository } from "@/backend/repository";
import DisplayInvoice from "../_core/pages/DisplayInvoice";
import { DisplayInvoiceType } from "../_core/types";

interface InvoiceProps {
  params: Promise<{
    invoiceId: string;
  }>;
}

export default async function InvoicePage(props: InvoiceProps) {
  // get Auth Details
  const { userId, orgId } = auth();

  // If User not found throw 404
  if (!userId) {
    notFound();
  }

  const { invoiceId } = await props.params;

  const invoice_Id: number = parseInt(invoiceId);

  // Check if the invoice id is a number
  if (isNaN(invoice_Id)) {
    throw new Error("Invalid invoice id");
  }

  // Get Invoice by Id with Org id and User Id
  const result = await invoiceRepository.getInvoicesByIdAsync({
    invoiceId: invoice_Id,
    userId: userId,
    organizationId: orgId!,
  });

  // If Invoice not found throw 404
  if (result.isErr()) {
    notFound();
  }

  return <DisplayInvoice item={result.value as DisplayInvoiceType} />;
}

"use server";
import { customerRepository, invoiceRepository } from "@/backend/repository";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { invoiceSchemaWithoutNameAndEmailValidation } from "../lib/validation";

export async function updateInvoiceAction(formData: FormData) {
  console.log("updateInvoice Executed");
  console.log("Form Data:", formData);
  // Validation
  const result = invoiceSchemaWithoutNameAndEmailValidation(formData);
  console.log("Server:Validation Result:", result);
  if (!result.success) {
    console.log("Server => Form Validation Failed");
    return;
  }

  const { userId, orgId } = auth();

  if (!userId) {
    return;
  }

  const invoiceData = {
    value: Math.floor(parseFloat(String(formData.get("value"))) * 100),
    description: formData.get("description") as string,
    invoiceId: parseInt(formData.get("id") as string),
  };

  console.log("Server => Invoice Data:", invoiceData);

  const invoiceResult = await invoiceRepository.updateInvoiceAsync({
    invoiceId: invoiceData.invoiceId,
    value: invoiceData.value,
    description: invoiceData.description,
    organizationId: orgId!,
    userId: userId,
  });

  if (invoiceResult.isErr()) {
    throw new Error(invoiceResult.error.message);
  }

  redirect(`/invoices/${invoiceData.invoiceId}`);
}

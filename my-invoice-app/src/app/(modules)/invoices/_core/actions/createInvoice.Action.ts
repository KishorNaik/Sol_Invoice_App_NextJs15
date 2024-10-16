"use server";
import { customerRepository, invoiceRepository } from "@/backend/repository";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { invoiceSchema, invoiceValidation } from "../lib/validation";

export async function createInvoiceAction(formData: FormData) {
  console.log("createInvoiceAction Executed");
  console.log("Form Data:", formData);
  // Validation
  const result = invoiceValidation(formData);
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
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const customerResult = await customerRepository.addAsync({
    userId: userId,
    organizationId: orgId!,
    name: invoiceData.name,
    email: invoiceData.email,
  });

  if (customerResult.isErr()) {
    throw new Error(customerResult.error.message);
  }

  const invoiceResult = await invoiceRepository.addAsync({
    userId: userId,
    organizationId: orgId!,
    customerId: customerResult.value,
    value: invoiceData.value,
    description: invoiceData.description,
    status: "open",
  });

  if (invoiceResult.isErr()) {
    throw new Error(invoiceResult.error.message);
  }

  redirect(`/invoices/${invoiceResult.value}`);
}

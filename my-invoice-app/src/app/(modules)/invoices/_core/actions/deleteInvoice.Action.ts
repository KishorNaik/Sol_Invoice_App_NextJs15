"use server";

import { invoiceRepository } from "@/backend/repository";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, orgId } = auth();

  if (!userId) {
    return;
  }

  const status = {
    id: String(formData.get("id")),
  };

  const result = await invoiceRepository.deleteAsync({
    invoiceId: status.id,
    userId: userId,
    organizationId: orgId!,
  });

  if (result.isErr()) {
    throw new Error(result.error.message);
  }

  redirect("/dashboard");
}

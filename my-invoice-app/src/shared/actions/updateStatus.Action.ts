"use server";
import { Status } from "@/backend/db/schema";
import { invoiceRepository } from "@/backend/repository";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateStatusAction(formData: FormData) {
  const { userId, orgId } = auth();

  if (!userId) {
    return;
  }

  const status = {
    id: String(formData.get("id")),
    status: String(formData.get("status") as Status),
  };

  const result = await invoiceRepository.updateStatusAsync({
    invoiceId: status.id,
    status: status.status,
    userId: userId,
    organizationId: orgId!,
  });

  if (result.isErr()) {
    throw new Error(result.error.message);
  }

  revalidatePath(`/invoices/${status.id}`, "page"); // Refresh Self Page
}

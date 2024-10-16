import { db } from "@/backend/db";
import { Invoices } from "@/backend/db/schema";
import { Err, Ok, Result } from "neverthrow";

export interface IAddInvoiceRepositoryDTO {
  value: number;
  description: string;
  userId: string;
  customerId: number;
  organizationId: string | null;
  status: string;
}

export const addInvoiceRepositoryAsync = async (
  params: IAddInvoiceRepositoryDTO
): Promise<Result<number, Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    const result = await db
      .insert(Invoices)
      .values({
        value: params.value!,
        description: params.description!,
        userId: params.userId!,
        status: params.status ?? "open",
        customerId: params.customerId!,
        organizationId: params.organizationId,
      })
      .returning({
        id: Invoices.id,
      });

    return new Ok(result[0].id);
  } catch (ex) {
    const error = ex as Error;
    return new Err(error);
  }
};

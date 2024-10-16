import { db } from "@/backend/db";
import { Invoices, Status } from "@/backend/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { Err, Ok, Result } from "neverthrow";

export interface IUpdateInvoiceRepositoryDTO {
  invoiceId: number;
  value: number;
  description?: string;
  userId?: string;
  organizationId: string;
}

export const updateInvoiceRepositoryAsync = async (
  params: IUpdateInvoiceRepositoryDTO
): Promise<Result<boolean, Error>> => {
  try {
    console.log(
      `Server: UpdateInvoiceRepositoryAsync Executed => ${JSON.stringify(
        params
      )}`
    );
    if (!params) return new Err(new Error("Invalid params"));

    if (params.organizationId) {
      await db
        .update(Invoices)
        .set({ value: params.value, description: params.description })
        .where(
          and(
            eq(Invoices.id, params.invoiceId),
            eq(Invoices.organizationId, params.organizationId)
          )
        );

      return new Ok(true);
    } else {
      await db
        .update(Invoices)
        .set({ value: params.value, description: params.description })
        .where(
          and(
            eq(Invoices.id, params.invoiceId),
            eq(Invoices.userId, params.userId!),
            isNull(Invoices.organizationId)
          )
        );

      return new Ok(true);
    }
  } catch (ex) {
    const error = ex as Error;
    return new Err(error);
  }
};

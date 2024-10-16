import { db } from "@/backend/db";
import { Invoices } from "@/backend/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { Err, Ok, Result } from "neverthrow";

export interface IDeleteInvoiceRepositoryDTO {
  invoiceId: string;
  userId: string;
  organizationId: string;
}

export const deleteInvoiceRepositoryAsync = async (
  params: IDeleteInvoiceRepositoryDTO
): Promise<Result<boolean, Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    if (params.organizationId) {
      await db
        .delete(Invoices)
        .where(
          and(
            eq(Invoices.id, parseInt(params.invoiceId)),
            eq(Invoices.organizationId, params.organizationId)
          )
        );

      return new Ok(true);
    } else {
      await db
        .delete(Invoices)
        .where(
          and(
            eq(Invoices.id, parseInt(params.invoiceId)),
            eq(Invoices.userId, params.userId),
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

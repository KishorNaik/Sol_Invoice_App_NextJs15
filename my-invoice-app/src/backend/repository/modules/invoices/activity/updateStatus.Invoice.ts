import { db } from "@/backend/db";
import { Invoices, Status } from "@/backend/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { Err, Ok, Result } from "neverthrow";

export interface IUpdateStatusRepositoryDTO {
  invoiceId: string;
  status: Status;
  userId?: string;
  organizationId: string;
}

export const updateStatusRepositoryAsync = async (
  params: IUpdateStatusRepositoryDTO
): Promise<Result<boolean, Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    if (params.organizationId) {
      await db
        .update(Invoices)
        .set({ status: params.status })
        .where(
          and(
            eq(Invoices.id, parseInt(params.invoiceId)),
            eq(Invoices.organizationId, params.organizationId)
          )
        );

      return new Ok(true);
    } else {
      await db
        .update(Invoices)
        .set({ status: params.status })
        .where(
          and(
            eq(Invoices.id, parseInt(params.invoiceId)),
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

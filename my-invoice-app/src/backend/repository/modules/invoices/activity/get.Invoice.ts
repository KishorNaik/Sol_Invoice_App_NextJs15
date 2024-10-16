import { db } from "@/backend/db";
import { Customers, Invoices } from "@/backend/db/schema";
import { CustomersType, InvoicesType } from "@/types";
import { Err, Ok, Result } from "neverthrow";
import { and, eq, isNull } from "drizzle-orm";
import Enumerable from "linq";

export interface IGetAllInvoicesRepositoryDTO {
  userId: string;
  organizationId: string | null;
}

export interface IGetAllInvoiceResultDTO extends InvoicesType {
  customer: CustomersType;
}

export const getAllInvoicesRepositoryAsync = async (
  params: IGetAllInvoicesRepositoryDTO
): Promise<Result<IGetAllInvoiceResultDTO[], Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    let results;
    if (params.organizationId) {
      results = await db
        .select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(eq(Invoices.organizationId, params.organizationId));
    } else {
      results = await db
        .select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(
          and(
            eq(Invoices.userId, params.userId),
            isNull(Invoices.organizationId)
          )
        );
    }

    if (!results) return new Err(new Error("No results"));

    var response = Enumerable.from(results)
      .select<IGetAllInvoiceResultDTO>((x) => ({
        createTs: x.invoices.createTs,
        customer: x.customers,
        description: x.invoices.description,
        id: x.invoices.id,
        organizationId: x.invoices.organizationId,
        status: x.invoices.status,
        userId: x.invoices.userId,
        value: x.invoices.value,
        customerId: x.invoices.customerId,
      }))
      .toArray();

    return new Ok(response);
  } catch (ex) {
    const error = ex as Error;
    return new Err(error);
  }
};

export interface IGetInvoiceByIdRepositoryDTO {
  userId?: string;
  organizationId?: string | null;
  invoiceId: number;
}

export interface IGetInvoiceByIdResultDTO extends InvoicesType {
  customer: CustomersType;
}

export const getInvoicesByIdRepositoryAsync = async (
  params: IGetInvoiceByIdRepositoryDTO
): Promise<Result<IGetInvoiceByIdResultDTO, Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    let results;
    if (params.organizationId) {
      results = await db
        .select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(
          and(
            eq(Invoices.id, params.invoiceId),
            eq(Invoices.organizationId, params.organizationId)
          )
        )
        .limit(1);
    } else if (params.userId) {
      results = await db
        .select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(
          and(
            eq(Invoices.id, params.invoiceId),
            eq(Invoices.userId, params.userId!),
            isNull(Invoices.organizationId)
          )
        );
    } else {
      results = await db
        .select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(eq(Invoices.id, params.invoiceId));
    }

    if (!results) return new Err(new Error("No results"));

    var response = Enumerable.from(results)
      .select<IGetInvoiceByIdResultDTO>((x) => ({
        createTs: x.invoices.createTs,
        customer: x.customers,
        description: x.invoices.description,
        id: x.invoices.id,
        organizationId: x.invoices.organizationId,
        status: x.invoices.status,
        userId: x.invoices.userId,
        value: x.invoices.value,
        customerId: x.invoices.customerId,
      }))
      .firstOrDefault()!;

    return new Ok(response);
  } catch (ex) {
    const error = ex as Error;
    return new Err(error);
  }
};

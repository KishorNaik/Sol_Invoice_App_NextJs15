import { db } from "@/backend/db";
import { Customers } from "@/backend/db/schema";
import { Err, Ok, Result } from "neverthrow";
import { and, eq, isNull } from "drizzle-orm";

export interface IAddCustomerRepositoryDTO {
  name: string;
  email: string;
  userId: string;
  organizationId: string;
}

export const addCustomerRepository = async (
  params: IAddCustomerRepositoryDTO
): Promise<Result<number, Error>> => {
  try {
    if (!params) return new Err(new Error("Invalid params"));

    const isUserExists = await db
      .select()
      .from(Customers)
      .where(eq(Customers.email, params.email))
      .execute();

    if (isUserExists.length > 0) {
      return new Ok(isUserExists[0].id);
    }

    const customerResult = await db
      .insert(Customers)
      .values({
        name: params.name,
        email: params.email,
        userId: params.userId,
        organizationId: params.organizationId || null,
      })
      .returning({
        id: Customers.id,
      });

    return new Ok(customerResult[0].id);
  } catch (ex) {
    const error = ex as Error;
    return new Err(error);
  }
};

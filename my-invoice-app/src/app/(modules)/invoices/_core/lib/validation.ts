import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid value"),
  description: z.string().min(1, "Description is required"),
});

export const invoiceValidation = (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    value: formData.get("value") as string,
    description: formData.get("description") as string,
  };

  const result = invoiceSchema.safeParse(data);
  return result;
};

export const invoiceSchemaWithoutNameAndEmail = invoiceSchema.omit({
  name: true,
  email: true,
});

export const invoiceSchemaWithoutNameAndEmailValidation = (
  formData: FormData
) => {
  const data = {
    value: formData.get("value") as string,
    description: formData.get("description") as string,
  };

  const result = invoiceSchemaWithoutNameAndEmail.safeParse(data);
  return result;
};

import { invoiceRepository } from "@/backend/repository";
import { IGetInvoiceByIdResultDTO } from "@/backend/repository/modules/invoices/activity/get.Invoice";
import { SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";
import { invoiceSchemaWithoutNameAndEmailValidation } from "../lib/validation";
import { EditInvoiceType } from "../types";

export default function useEditInvoiceForm(
  item: EditInvoiceType,
  status: string = "ready"
) {
  const [state, setState] = useState(status);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  console.log("Client => Invoice Id:", item.id);

  const [formValues, setFormValues] = useState({
    value: item?.value || "",
    description: item?.description || "",
    invoiceId: item.id,
  });

  function handleSubmit(e: SyntheticEvent) {
    console.log("handleSubmit Executed");
    if (state === "pending") {
      e.preventDefault();
      return;
    }

    // Validation
    const formData = new FormData(e.target as HTMLFormElement);
    const result = invoiceSchemaWithoutNameAndEmailValidation(formData);
    console.log("Client:Validation Result:", result);
    if (!result.success) {
      setErrors(result.error.issues);
      console.log("Client => Form Validation Failed");
      return;
    }

    setErrors([]);
    setState("pending");
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    clearError(name);
  };

  function clearError(fieldName: string) {
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.path[0] !== fieldName)
    );
  }

  return {
    errors,
    state,
    setState,
    handleSubmit,
    formValues,
    setFormValues,
    handleInputChange,
  };
}

import { SyntheticEvent, useState } from "react";
import { z } from "zod";
import { invoiceSchema, invoiceValidation } from "../lib/validation";
import { createInvoiceAction } from "../actions/createInvoice.Action";

export default function useNewInvoiceForm(status: string = "ready") {
  const [state, setState] = useState(status);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  function handleSubmit(e: SyntheticEvent) {
    console.log("handleSubmit Executed");
    if (state === "pending") {
      e.preventDefault();
      return;
    }

    // Validation
    const formData = new FormData(e.target as HTMLFormElement);
    const result = invoiceValidation(formData);
    console.log("Client:Validation Result:", result);
    if (!result.success) {
      setErrors(result.error.issues);
      console.log("Client => Form Validation Failed");
      return;
    }

    setErrors([]);
    setState("pending");
  }

  function clearError(fieldName: string) {
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.path[0] !== fieldName)
    );
  }

  return { state, handleSubmit, errors, clearError };
}

"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import { createInvoiceAction } from "../../actions/createInvoice.Action";
import ErrorMessage from "@/components/ErrorMessage";
import useNewInvoiceForm from "../../hooks/useNewInvoiceForm";

const NewInvoiceForm = () => {
  const { state, handleSubmit, errors, clearError } =
    useNewInvoiceForm("ready");

  return (
    <>
      <Form
        className="grid gpa-4 max-w-xs"
        action={createInvoiceAction}
        onSubmit={handleSubmit}
      >
        <div className="mt-4">
          <Label htmlFor="name" className="block font-semibold mb-2 text-sm">
            Billing Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={() => clearError("name")}
          />
          <ErrorMessage errors={errors} fieldName="name" />
        </div>
        <div className="mt-4">
          <Label htmlFor="email" className="block font-semibold mb-2 text-sm">
            Billing Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={() => clearError("email")}
          />
          <ErrorMessage errors={errors} fieldName="email" />
        </div>
        <div className="mt-4">
          <Label htmlFor="value" className="block font-semibold mb-2 text-sm">
            Value
          </Label>
          <Input
            id="value"
            name="value"
            type="text"
            onChange={() => clearError("value")}
          />
          <ErrorMessage errors={errors} fieldName="value" />
        </div>
        <div className="mt-4">
          <Label
            htmlFor="description"
            className="block font-semibold mb-2 text-sm"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            onChange={() => clearError("description")}
          ></Textarea>
          <ErrorMessage errors={errors} fieldName="description" />
        </div>
        <div className="mt-4">
          <SubmitButton />
        </div>
      </Form>
    </>
  );
};

export default NewInvoiceForm;

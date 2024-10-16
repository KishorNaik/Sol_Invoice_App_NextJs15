"use client";
import ErrorMessage from "@/components/ErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import useEditInvoiceForm from "../../hooks/useEditInvoiceStatus";
import { updateInvoiceAction } from "../../actions/updateInvoice.Action";
import { EditInvoiceType } from "../../types";

export interface EditInvoiceFormProps {
  item: EditInvoiceType;
}

const EditInvoiceForm = (props: EditInvoiceFormProps) => {
  const { item } = props;

  const { formValues, handleSubmit, errors, handleInputChange } =
    useEditInvoiceForm(item, "ready");

  console.log("Client POST => Invoice Id:", item.id);
  return (
    <>
      <Form
        className="grid gpa-4 max-w-xs"
        action={updateInvoiceAction}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="id" value={formValues.invoiceId} />
        <div className="mt-4">
          <Label htmlFor="value" className="block font-semibold mb-2 text-sm">
            Value
          </Label>
          <Input
            id="value"
            name="value"
            type="text"
            value={formValues?.value}
            onChange={handleInputChange}
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
            value={formValues?.description}
            onChange={handleInputChange}
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

export default EditInvoiceForm;

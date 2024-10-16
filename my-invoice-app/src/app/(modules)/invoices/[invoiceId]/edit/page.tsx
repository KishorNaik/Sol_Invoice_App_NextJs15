"use server";
import EditInvoice from "../../_core/pages/EditInvoice";

export interface UpdateInvoiceProps {
  params: Promise<{
    invoiceId: string;
  }>;
}

const UpdateInvoice = async (props: UpdateInvoiceProps) => {
  const { invoiceId } = await props.params;
  return <EditInvoice invoiceId={invoiceId} />;
};

export default UpdateInvoice;

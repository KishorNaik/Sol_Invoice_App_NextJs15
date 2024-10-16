"use server";
import Container from "@/components/Container";
import EditInvoiceHeader from "../components/edit/EditInvoiceHeader";
import EditInvoiceForm from "../components/edit/EditInvoiceForm";
import { invoiceRepository } from "@/backend/repository";
import { notFound } from "next/navigation";
import { EditInvoiceType } from "../types";

interface EditInvoiceProps {
  invoiceId: string;
}

const EditInvoice = async (props: EditInvoiceProps) => {
  const result = await invoiceRepository.getInvoicesByIdAsync({
    invoiceId: parseInt(props.invoiceId),
  });

  if (result.isErr()) {
    notFound();
  }

  console.log(`Server: ${JSON.stringify(result.value)}`);

  return (
    <>
      <main className="h-full">
        <Container>
          <EditInvoiceHeader />
          <EditInvoiceForm item={result.value as EditInvoiceType} />
        </Container>
      </main>
    </>
  );
};

export default EditInvoice;

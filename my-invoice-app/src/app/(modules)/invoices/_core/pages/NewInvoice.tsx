"use server";
import Container from "@/components/Container";
import NewInvoiceHeader from "../components/new/NewInvoiceHeader";
import NewInvoiceForm from "../components/new/NewInvoiceForm";

const NewInvoice = async () => {
  return (
    <>
      <main className="h-full">
        <Container>
          <NewInvoiceHeader />
          <NewInvoiceForm />
        </Container>
      </main>
    </>
  );
};

export default NewInvoice;

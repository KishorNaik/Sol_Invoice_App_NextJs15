"use client";
import Container from "@/components/Container";
import { DisplayInvoiceType } from "../types";
import InvoiceIdTitle from "../components/display/InvoiceIdTitle";
import ChangeStatus from "../components/display/ChangeStatus";
import MoreOptions from "../components/display/MoreOptions";
import InvoiceDetails from "../components/display/InvoiceDetails";
import { deleteInvoiceAction } from "../actions/deleteInvoice.Action";
import { useInvoiceStatus } from "../hooks/useInvoiceStatus";

export interface IDisplayPageProps {
  item: DisplayInvoiceType;
}

export default function DisplayInvoice(props: IDisplayPageProps) {
  const { item } = props;

  const { currentStatus, handleOnUpdateStatus } = useInvoiceStatus(item.status);

  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <InvoiceIdTitle invoiceId={item.id} currentStatus={currentStatus} />

          <div className="flex flex-row items-center gap-4">
            <ChangeStatus
              invoiceId={item.id}
              handleOnUpdateStatus={handleOnUpdateStatus}
            />

            <MoreOptions
              invoiceId={item.id}
              status={currentStatus}
              onDeleteInvoice={deleteInvoiceAction}
            />
          </div>
        </div>

        <InvoiceDetails item={item} />
      </Container>
    </main>
  );
}

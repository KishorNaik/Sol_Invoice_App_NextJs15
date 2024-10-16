import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { IPaymentPageType } from "../types";
import IsError from "../components/IsError";
import IsCanceled from "../components/IsCanceled";
import InvoiceDetails from "../components/InvoiceDetails";
import CreatePayment from "../components/CreatePayment";
import { createPaymentAction } from "../actions/creatPaymentAction";

export interface IPaymentPageProps {
  item: IPaymentPageType;
  isError: boolean | string;
  isCanceled: boolean;
}

const PaymentPage = (props: IPaymentPageProps) => {
  const { item, isError, isCanceled } = props;

  return (
    <>
      <main className="w-full h-full">
        <Container>
          <IsError isError={isError} />

          <IsCanceled isCanceled={isCanceled} />

          <div className="grid grid-cols-2">
            <InvoiceDetails item={item} />

            <CreatePayment item={item} onPaymentCreate={createPaymentAction} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default PaymentPage;

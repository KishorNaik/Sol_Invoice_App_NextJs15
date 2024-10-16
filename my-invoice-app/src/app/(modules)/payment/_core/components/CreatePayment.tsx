import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { IPaymentPageType } from "../types";

export interface CreatePaymentProps {
  item: IPaymentPageType;
  onPaymentCreate: (formData: FormData) => Promise<void>;
}

const CreatePayment = (props: CreatePaymentProps) => {
  const { item, onPaymentCreate } = props;
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl mb-4">Mange Invoice</h2>
        {item.status === "open" && (
          <form action={onPaymentCreate}>
            <input type="hidden" name="id" value={item.id} />
            <Button className="flex flex-row gap-2 font-bold bg-green-700">
              <CreditCard className="w-5 h-auto" />
              Pay Invoice
            </Button>
          </form>
        )}
        {item.status === "paid" && (
          <p className="text-xl font-bold flex flex-row gap-2">
            <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
            Invoice Paid
          </p>
        )}
      </div>
    </>
  );
};

export default CreatePayment;

import { Badge } from "@/components/ui/badge";
import { IPaymentPageType } from "../types";
import { cn } from "@/lib/utils";

export interface InvoiceDetailsProps {
  item: IPaymentPageType;
}

const InvoiceDetails = (props: InvoiceDetailsProps) => {
  const { item } = props;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-semibold">
            Invoice #{item.id}
            <Badge
              className={cn(
                "rounded-full",
                "capitalize",
                item.status === "open" && "bg-blue-500",
                item.status === "paid" && "bg-green-500",
                item.status === "void" && "bg-zinc-700",
                item.status === "uncollectible" && "bg-red-600"
              )}
            >
              {item.status}
            </Badge>
          </h1>
        </div>

        <p className="text-3xl mb-3">${(item.value / 100).toFixed(2)}</p>

        <p className="text-lg mb-8">{item.description}</p>

        <ul className="grid gap-2">
          <li className="flex gpa-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Id
            </strong>

            <span>{item.id}</span>
          </li>
          <li className="flex gpa-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>

            <span>{new Date(item.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gpa-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>

            <span>{item.customer.name}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default InvoiceDetails;

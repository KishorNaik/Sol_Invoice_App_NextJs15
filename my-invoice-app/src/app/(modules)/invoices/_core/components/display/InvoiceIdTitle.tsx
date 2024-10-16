import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface InvoiceIdTitleProps {
  invoiceId: number;
  currentStatus: string;
}

const InvoiceIdTitle = (props: InvoiceIdTitleProps) => {
  return (
    <>
      <h1 className="flex items-center gap-3 text-3xl font-semibold">
        Invoice #{props.invoiceId}
        <Badge
          className={cn(
            "rounded-full",
            "capitalize",
            props.currentStatus === "open" && "bg-blue-500",
            props.currentStatus === "paid" && "bg-green-500",
            props.currentStatus === "void" && "bg-zinc-700",
            props.currentStatus === "uncollectible" && "bg-red-600"
          )}
        >
          {props.currentStatus}
        </Badge>
      </h1>
    </>
  );
};

export default InvoiceIdTitle;

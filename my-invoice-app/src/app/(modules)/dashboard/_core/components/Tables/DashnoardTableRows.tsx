import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DashboardInvoiceType } from "../../types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DashboardTableRowsProps {
  items: DashboardInvoiceType[];
}

const DashboardTableRows = (props: DashboardTableRowsProps) => {
  const { items } = props;
  return (
    <>
      <TableBody>
        {items.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-left p-0">
              <Link
                href={`/invoices/${invoice.id}`}
                className="font-semibold p-4 block"
              >
                {invoice.createTs.toLocaleDateString()}
              </Link>
            </TableCell>
            <TableCell className="text-left p-0">
              <Link
                href={`/invoices/${invoice.id}`}
                className="font-semibold p-4 block"
              >
                {invoice.customer.name}
              </Link>
            </TableCell>
            <TableCell className="text-left p-0">
              <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                {invoice.customer.email}
              </Link>
            </TableCell>
            <TableCell className="text-center p-0">
              <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                <Badge
                  className={cn(
                    "rounded-full",
                    "capitalize",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "paid" && "bg-green-500",
                    invoice.status === "void" && "bg-zinc-700",
                    invoice.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </Link>
            </TableCell>
            <TableCell className="text-right p-0">
              <Link
                href={`/invoices/${invoice.id}`}
                className="font-semibold p-4 block"
              >
                ${(invoice.value / 100).toFixed(2)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DashboardTableRows;

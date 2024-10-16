import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const InvoiceHeader = () => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
          <Button variant="ghost" className="inline-flex gap-2" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" />
              Create Invoices
            </Link>
          </Button>
        </p>
      </div>
    </>
  );
};

export default InvoiceHeader;

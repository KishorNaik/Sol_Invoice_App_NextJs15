import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Ellipsis, Trash2 } from "lucide-react";
import Link from "next/link";

export interface IMoreOptionsProps {
  invoiceId: number;
  status: string;
  onDeleteInvoice: (formData: FormData) => Promise<void>;
}

const MoreOptions = (props: IMoreOptionsProps) => {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex flex-row items-center gap-2"
              variant={"outline"}
            >
              <span className="sr-only">More Options</span>
              <Ellipsis className="w-4 h-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="flex flex-row items-center gap-2 bg-red-500 text-white p-2 rounded-md">
                  <Trash2 className="h-auto w-4" />
                  Delete Invoice
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
            {props.status !== "paid" && (
              <DropdownMenuItem>
                <Link
                  href={`/invoices/${props.invoiceId}/edit`}
                  className="flex flex-row items-center gap-2"
                >
                  <CreditCard className="h-auto w-4" />
                  Edit Invoice
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link
                href={`/payment/invoices/${props.invoiceId}`}
                className="flex flex-row items-center gap-2"
              >
                <CreditCard className="h-auto w-4" />
                Payment
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Are you sure you want to delete this invoice?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              invoice and remove your data from our servers.
            </DialogDescription>
            <DialogFooter>
              <form
                className="flex items-start gap-2"
                action={props.onDeleteInvoice}
              >
                <input type="hidden" name="id" value={props.invoiceId} />
                <Button
                  variant={"destructive"}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-auto w-4" />
                  Delete Invoice
                </Button>
              </form>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoreOptions;

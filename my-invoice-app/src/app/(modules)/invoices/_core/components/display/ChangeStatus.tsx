import { AVAILABLE_STATUSES } from "@/app/_core/data/invoices";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export interface ChangeStatusProps {
  invoiceId: number;
  handleOnUpdateStatus: (formData: FormData) => Promise<void>;
}

const ChangeStatus = (props: ChangeStatusProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex flex-row items-center gap-2"
            variant={"outline"}
          >
            Change Status
            <ChevronDown className="h-auto w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {AVAILABLE_STATUSES.map((status) => {
            return (
              <DropdownMenuItem key={status.id}>
                <form action={props.handleOnUpdateStatus}>
                  <input type="hidden" name="id" value={props.invoiceId} />
                  <input type="hidden" name="status" value={status.id} />
                  <button>{status.label}</button>
                </form>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ChangeStatus;

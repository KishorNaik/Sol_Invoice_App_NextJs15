// useInvoiceStatus.js
import { useOptimistic } from "react";
import { updateStatusAction } from "../../../../../shared/actions/updateStatus.Action";
import { Status } from "@/backend/db/schema";

export function useInvoiceStatus(initialStatus: string) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    initialStatus,
    (state, newStatus) => String(newStatus)
  );

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("status") as Status);

    try {
      await updateStatusAction(formData);
    } catch (ex) {
      setCurrentStatus(originalStatus);
    }
  }

  return { currentStatus, handleOnUpdateStatus };
}

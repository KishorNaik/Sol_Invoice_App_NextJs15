import {
  IGetAllInvoiceResultDTO,
  IGetInvoiceByIdResultDTO,
} from "@/backend/repository/modules/invoices/activity/get.Invoice";
import { CustomersType, InvoicesType } from "@/types";

export interface DisplayInvoiceType extends IGetInvoiceByIdResultDTO {}
export interface EditInvoiceType extends IGetInvoiceByIdResultDTO {}

export interface InvoicesType {
  value: number;
  id: number;
  userId: string;
  createTs: Date;
  description: string;
  organizationId: string | null;
  status: string;
  customerId: number;
}

export interface CustomersType {
  id: number;
  name: string;
  userId: string;
  createTs: Date;
  organizationId: string | null;
  email: string;
}

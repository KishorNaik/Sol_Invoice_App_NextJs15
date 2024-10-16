import CustomerRepository from "./modules/customers/customer.Repository";
import InvoiceRepository from "./modules/invoices/invoice.Repository";

const customerRepository = new CustomerRepository();
const invoiceRepository = new InvoiceRepository();

export { customerRepository, invoiceRepository };

import { DisplayInvoiceType } from "../../types";

export interface InvoiceDetailsProps {
  item: DisplayInvoiceType;
}

const InvoiceDetails = (props: InvoiceDetailsProps) => {
  const { item } = props;

  return (
    <>
      <p className="text-3xl mb-3">${(item.value / 100).toFixed(2)}</p>

      <p className="text-lg mb-8">{item.description}</p>

      <h2 className="font-bold text-lg mb-4"></h2>

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
        <li className="flex gpa-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Email
          </strong>

          <span>{item.customer.email}</span>
        </li>
      </ul>
    </>
  );
};

export default InvoiceDetails;

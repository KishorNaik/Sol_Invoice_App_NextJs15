import Container from "@/components/Container";
import { Table, TableCaption } from "@/components/ui/table";
import InvoiceHeader from "../components/Header";
import DashboardTableHeader from "../components/Tables/DashboardTableHeader";
import { DashboardInvoiceType } from "../types";
import DashboardTableRows from "../components/Tables/DashnoardTableRows";

export interface IDashboardPageProps {
  items: DashboardInvoiceType[];
}

const DashboardPage = (props: IDashboardPageProps) => {
  const { items } = props;

  return (
    <>
      <main className="h-full">
        <Container>
          <InvoiceHeader />
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <DashboardTableHeader />
            <DashboardTableRows items={items} />
          </Table>
        </Container>
      </main>
    </>
  );
};

export default DashboardPage;

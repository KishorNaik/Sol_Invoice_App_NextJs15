import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] p-4">Date</TableHead>
        <TableHead className="p-4">Customer</TableHead>
        <TableHead className="p-4">Email</TableHead>
        <TableHead className="text-center p-4">Status</TableHead>
        <TableHead className="text-right p-4">Value</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DashboardTableHeader;

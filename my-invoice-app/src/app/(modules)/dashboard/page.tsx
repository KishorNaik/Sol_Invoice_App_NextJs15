import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db } from "@/backend/db";
import { Customers, Invoices } from "@/backend/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import DashboardPage from "./_core/pages";
import Enumerable from "linq";
import { DashboardInvoiceType } from "./_core/types";
import { invoiceRepository } from "@/backend/repository";
import Error from "@/app/error";

export default async function Dashboard() {
  // Check auth
  const { userId, orgId } = auth();

  // If User not found throw 404
  if (!userId) {
    notFound();
  }

  // Get All Invoice based on the OrgId and UserId
  const result = await invoiceRepository.getAllInvoicesAsync({
    userId: userId,
    organizationId: orgId!,
  });

  if (result.isErr()) {
    return <Error error={result.error} />;
  }

  return <DashboardPage items={result.value as DashboardInvoiceType[]} />;
}

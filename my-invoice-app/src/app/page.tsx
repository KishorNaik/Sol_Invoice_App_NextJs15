import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center gap-6 text-center p-24 mx-auto max-w-5xl">
      <h1 className="text-5xl font-bold">InvoicePedia</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Start...</Link>
        </Button>
      </p>
    </main>
  );
}

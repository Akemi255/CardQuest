import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function page() {
  return (
    <div className="bg-[#171928] h-screen">
      <div className="container">
        <Table className="text-white">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>Card</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>234</TableCell>
              <TableCell className="text-right">234</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

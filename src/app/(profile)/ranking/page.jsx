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

import UserTable from "./components/UserTable";

export default function page() {
  return (
    <div className="bg-[#171928] h-screen">
      <div className="container">
        <Table className="text-white [&_.text-muted-foreground]:text-white">
          <TableCaption>User Ranking</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>Card</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(Array(10).keys()).map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <UserTable
                      username={"John Doe"}
                      userUrl={"https://www.google.com"}
                      imageUrl={"https://github.com/shadcn.png"}
                    />
                  </TableCell>
                  <TableCell>234</TableCell>
                  <TableCell className="text-right">234</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

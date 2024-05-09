"use client";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import UserTable from "./UserTable";
import { SetEmail } from "@/helpers/SetEmail";

const RankingTable = ({ usersData, totalPages }) => {
  const email = SetEmail();
  const [page, setPage] = useState(1);
  const [loadedUsers, setLoadedUsers] = useState(usersData || []);
  const [loading, setLoading] = useState(false);

  const loadNewPage = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/users/getUsersRank?page=${
          page + 1
        }`
      );
      const data = await response.json();
      const newUsers = data.usersRank;
      setPage(page + 1);
      setLoadedUsers([...loadedUsers, ...newUsers]);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171928] h-auto w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Table className="text-white [&_.text-muted-foreground]:text-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Card</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <UserTable
                      username={user.user.name}
                      userUrl={"https://www.google.com"}
                      imageUrl={user.user.image}
                    />
                    {user.user.email === email && (
                      <Badge
                        variant="outline"
                        className="ml-2 hidden sm:flex text-white bg-black border-none"
                      >
                        You
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{user.totalCards}</TableCell>
                <TableCell className="text-right">{user.totalPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {page < totalPages && (
          <div className="text-center mb-4">
            <Button
              onClick={loadNewPage}
              className={`hover:bg-black ${
                loading ? "bg-gray-600 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingTable;

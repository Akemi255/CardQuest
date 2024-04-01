"use client";

import React, { useState, useEffect } from "react";

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
import fetchRanking from "./data/fetchRanking";

export default async function page() {
  // const rankings = await fetchRanking();

  // console.log(rankings);

  const [usersData, setUsersData] = useState(null);
  // const email = getEmail();

  const getUsersData = async () => {
    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/users/getUsersRank"
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      setUsersData(data);
      console.log(usersData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="bg-[#171928] h-auto w-full overflow-scroll">
      <div className="max-w-7xl mx-auto">
        <Table className="text-white [&_.text-muted-foreground]:text-white">
          <TableCaption>User Ranking</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Card</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData ? (
              usersData.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <UserTable
                        username={user.user.name}
                        userUrl={"https://www.google.com"}
                        imageUrl={user.user.image}
                      />
                    </TableCell>
                    <TableCell>{user.totalCards}</TableCell>
                    <TableCell className="text-right">
                      {user.totalPoints}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <div>ad</div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

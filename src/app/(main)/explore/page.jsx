"use client";

import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Search from "./components/Search";
import List from "./components/List";
import PaginationComponent from "./components/PaginationComponent";

export default async function page({ searchParams }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <Search />
      {/* <List query={query} currentPage={currentPage} /> */}
      {/* <PaginationComponent /> */}
    </div>
  );
}

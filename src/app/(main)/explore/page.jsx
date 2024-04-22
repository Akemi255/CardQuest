"use client";

import { Input } from "@/components/ui/input";
import React, { Suspense, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Search from "./components/Search";
import List from "./components/List";
import PaginationComponent from "./components/PaginationComponent";
import useSWR from "swr";
import RenderUserCards from "@/components/Cards/RenderUserCards";
import RenderExploreCards from "./components/RenderExploreCards";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function page() {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/apiCards/sortedByCoins/1`,
    fetcher
  );

  console.log(data);

  // const query = searchParams?.query || "";
  // const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      {/* <Search /> */}
      {/* <List query={query} currentPage={currentPage} /> */}
      {/* <PaginationComponent /> */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {data?.cards?.map((card, index) => (
            <RenderExploreCards key={index} index={index} character={card} />
          ))}
        </div>
      </div>

      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}

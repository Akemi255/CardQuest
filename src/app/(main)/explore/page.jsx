"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import useSWR from "swr";
import RenderExploreCards from "./components/RenderExploreCards";

import { useDebouncedCallback } from "use-debounce";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/apiCards/sortedByCoins/${pageIndex}`,
    fetcher
  );

  //TODO:
  const filteredCards = data?.cards?.filter((card) =>
    card?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(data);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-3 px-2 py-1 mr-3 rounded-md border border-gray-300 w-full sm:w-1/2"
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {isLoading ? (
            <div className="text-white">Loading,...</div>
          ) : (
            filteredCards?.map((card, index) => (
              <RenderExploreCards key={index} index={index} character={card} />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => setPageIndex(pageIndex - 1)}
        className="text-white"
      >
        Previous
      </button>
      <button
        onClick={() => setPageIndex(pageIndex + 1)}
        className="text-white"
      >
        Next
      </button>
    </div>
  );
}

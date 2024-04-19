"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useSWR from "swr";

import RenderUserCards from "@/components/Cards/RenderUserCards";
import { SetEmail } from "@/helpers/SetEmail";

import { Input } from "@/components/ui/input";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Page() {
  const email = SetEmail();
  const [searchTerm, setSearchTerm] = useState("");

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  const filteredCards = data?.filter((card) =>
    card?.content.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-3 px-2 py-1 mr-3 rounded-md border border-gray-300 w-full sm:w-1/2"
      />

      <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
        {filteredCards?.map((card, index) => (
          <RenderUserCards key={index} index={index} character={card.content} />
        ))}
      </div>
    </div>
  );
}

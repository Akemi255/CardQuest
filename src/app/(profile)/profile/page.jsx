"use client";

import CharacterCard from "@/components/Cards/CharacterCard";
import React from "react";
import useSWR from "swr";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function page() {
  const email = "gus1465@aol.com";

  const { data, error, isLoading } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${email}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div className="">loading...</div>;

  // console.log(data);

  return (
    <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
      {data.map((card, index) => {
        // console.log(card.content);
        return (
          <CharacterCard
            key={index}
            index={index}
            character={card.content}
            // getColorForRarity={"border-red-800"}
            // saveCharacter={saveCharacter}
            // existingCards={existingCards}
            // loading={loading}
          />
        );
      })}
    </div>
  );
}

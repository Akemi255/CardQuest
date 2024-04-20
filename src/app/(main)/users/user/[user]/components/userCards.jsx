"use client";
import { useState } from "react";
import RenderUserCards from "@/components/Cards/RenderUserCards";
import { Input } from "@/components/ui/input";

const UserCards = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Verificar si data es un array antes de filtrarlo
  const filteredCards = Array.isArray(data)
    ? data.filter((card) =>
        card?.content.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col items-center">
      {data.length > 0 && (
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-3 px-2 py-1 mr-3 rounded-md border border-gray-300 w-full sm:w-1/2"
        />
      )}

      <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
        {data.length > 0 ? (
          filteredCards.map((card, index) => (
            <RenderUserCards
              key={index}
              index={index}
              character={card.content}
            />
          ))
        ) : (
          <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
            This user has no cards
          </h1>
        )}
      </div>
    </div>
  );
};

export default UserCards;

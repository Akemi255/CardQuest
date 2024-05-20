import React from "react";
import Link from "next/link";
import CharacterCard from "./CharacterCard";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

function CharacterDrop({
  characterData,
  getColorForRarity,
  saveCharacter,
  existingCards,
  loading,
  CleanArray,
  fetchCharacterData,
  remainingAttempts,
}) {
  return (
    <div className="relative bg-[#241c32] border-[4px] border-[#FFD9E4] rounded-lg p-4 w-5/6 mx-auto mt-6">
      {characterData.length > 0 && (
        <div className="flex flex-wrap gap-[20px] justify-center mt-10">
          {characterData.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              index={index}
              getColorForRarity={getColorForRarity}
              saveCharacter={saveCharacter}
              existingCards={existingCards}
              loading={loading}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4 container mb-10 md:mb-0 mt-4">
        <Link href="/profile">
          <Button className="relative md:top-[140px] top-[125px] lg:right-[150px] md:w-[150px] md:h-[60px] w-[100px] h-[60px]  text-lg font-bold bg-gradient-to-r from-yellow-200 to-pink-400 text-black rounded-full px-4 py-2">
            Inventory
          </Button>
        </Link>
        <Button
          className="relative md:top-[90px] top-[110px] bg-gradient-to-r from-yellow-200 to-pink-400 rounded-full px-4 py-2 hover:bg-[#FFD9E4] border-[1px] text-[#000] border-[#FFD9E4] hover:border-[#FFCCD9] p-4 md:w-[150px] md:h-[150px] w-[100px] h-[100px]"
          onClick={() => {
            CleanArray();
            fetchCharacterData();
          }}
        >
          <RefreshCcw
            width={80}
            height={80}
            className="md:h-20 md:w-20 rounded-full h-13 w-13"
          />
        </Button>
        <Button className="cursor-auto relative lg:left-[150px] md:top-[140px] top-[125px] md:w-[150px] md:h-[60px] w-[100px] h-[60px]  text-lg font-bold bg-gradient-to-r from-yellow-200 to-pink-400 text-black rounded-full px-4 py-2">
          {`Intents: ${remainingAttempts}`}
        </Button>
      </div>
    </div>
  );
}

export default CharacterDrop;

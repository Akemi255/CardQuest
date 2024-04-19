"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useSWR from "swr";

import RenderUserCards from "@/components/Cards/RenderUserCards";
import { SetEmail } from "@/helpers/SetEmail";

import { Input } from "@/components/ui/input";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

<<<<<<< HEAD
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
=======
export default function page() {
  const userID = "654952e10ef0a1ea2aaac3a9";
  const email = "gus1465@aol.com";

  const { data: user } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/users/getProfileById/${userID}`,
    fetcher
  );

  // console.log("feth first");
  // console.log(user);

  const { data, error, isLoading } = useSWR(
    () =>
      `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${user.user.email}`,
>>>>>>> 7111615c282b466d613bd290560671eb48bf3909
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

<<<<<<< HEAD
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
=======
  console.log(data);

  return (
    <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
      {data?.map((card, index) => {
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
>>>>>>> 7111615c282b466d613bd290560671eb48bf3909
    </div>
  );
}

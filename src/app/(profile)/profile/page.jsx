"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useSWR from "swr";

import { SetEmail } from "@/helpers/SetEmail";

import { Input } from "@/components/ui/input";
import ProfileCards from "./components/ProfileCards";

import { toast } from "react-toastify";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Page() {
  const email = SetEmail();
  const [searchTerm, setSearchTerm] = useState("");
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher,
    {
      onSuccess: (data) => {
        setUserCards(data);
        setIsLoading(false);
      },
    }
  );

  const handleDeleteCard = async (mal_id) => {
    try {
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/cards/deleteIndividualCard/${mal_id}/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Card deleted successfully");
        setUserCards(
          userCards.filter((card) => card.content.mal_id !== mal_id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
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

      {userCards.length === 0 ? (
        <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
          This user has no cards
        </h1>
      ) : (
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {userCards
            .filter((card) =>
              card?.content.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((card, index) => (
              <ProfileCards
                key={index}
                index={index}
                character={card.content}
                onDeleteCard={handleDeleteCard}
              />
            ))}
        </div>
      )}
    </div>
  );
}

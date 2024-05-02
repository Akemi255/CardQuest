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

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher,
    {
      onSuccess: (data) => {
        setUserCards(data);
      },
    }
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  const filteredCards = userCards.filter((card) =>
    card?.content.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        // Actualiza el estado local de las cartas eliminando la carta eliminada
        setUserCards(
          userCards.filter((card) => card.content.mal_id !== mal_id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
      toast.error("Something went wrong");
    }
  };

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
        {filteredCards.map((card, index) => (
          <ProfileCards
            key={index}
            index={index}
            character={card.content}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </div>
  );
}

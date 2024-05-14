"use client";
import useSWR from "swr";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { ProfileMarketCards } from "./MarketUserCards/ProfileMarketCards";
import { getEmail } from "@/helpers/getEmail";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }
};

const StartingTrade = ({ user, data: UserData }) => {
  const userName = UserData?.name;
  const userEmail = UserData?.email;
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const email = getEmail();

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data: userCards, isLoading } = useSWR(
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

  const handleCardAddedToTrade = (cardId) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(cardId)) {
        const updatedCards = prevSelectedCards.filter((id) => id !== cardId);
        return updatedCards;
      } else {
        const newSelectedCards = [...prevSelectedCards, cardId];
        return newSelectedCards;
      }
    });
  };

  const handleSendRequestClick = async () => {
    try {
      if (isRequestSent) {
        toast.error("Trade is already sended");
        return;
      }

      if (userEmail === email) {
        toast.error("Can't trade with yourself");
        return;
      }

      if (selectedCards.length === 0) {
        toast.error("Select at least 1 card to start the trade");
        return;
      }

      // Realizar la solicitud POST
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/trade/sendTradeRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user,
            email: email,
            cardsOffered: selectedCards,
          }),
        }
      );

      if (response.ok) {
        toast.success("Trade request sent successfully");
        setIsRequestSent(true);
        setTimeout(() => {
          router.push("/trade");
        }, 200);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="w-full p-4 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            {userName && <p>{`Trade with ${userName}`}</p>}
          </h1>
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Select the cards you offer</p>
          </h1>
          <div className="flex justify-center items-center mt-2">
            <Button
              onClick={handleSendRequestClick}
              className="bg-slate-800 px-4 py-2 text-white rounded-md hover:bg-black text-2xl font-bold  cursor-pointer relative transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
            >
              Send
            </Button>
          </div>
          <div className="flex items-center md:relative mt-2  md:mb-0">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
              placeholder="Find cards..."
            />
          </div>

          {userCards.length > 0 && (
            <div className="flex flex-wrap gap-[20px] justify-center mt-3 mb-[50px]">
              {userCards
                .filter((card) =>
                  card?.content?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((card, index) => (
                  <ProfileMarketCards
                    index={index}
                    key={card._id}
                    character={card.content}
                    id={card._id}
                    onCardAddedToTrade={handleCardAddedToTrade}
                    isSelected={selectedCards.includes(card._id)}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StartingTrade;

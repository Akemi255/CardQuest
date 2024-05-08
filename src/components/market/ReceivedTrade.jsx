"use client";
import useSWR from "swr";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { ProfileMarketCards } from "./MarketUserCards/ProfileMarketCards";
import { getEmail } from "@/helpers/getEmail";
import RenderUserCards from "../Cards/RenderUserCards";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

const ReceivedTrade = ({ id, tradeData }) => {
  const [addedCards, setAddedCards] = useState([]);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [searchTermRight, setSearchTermRight] = useState("");

  const email = getEmail();
  const router = useRouter();

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data: userCards, error: userCardsError } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  if (!userCards && !userCardsError)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  const handleCardAddedToTrade = (cardId) => {
    setAddedCards((prevAddedCards) => {
      if (prevAddedCards.includes(cardId)) {
        const updatedCards = prevAddedCards.filter((id) => id !== cardId);
        return updatedCards;
      }

      const newAddedCards = [...prevAddedCards, cardId];
      return newAddedCards;
    });
  };

  const handleSendRequestClick = async () => {
    try {
      if (isRequestSent) {
        toast.error("La solicitud ya ha sido enviada.");
        return;
      }

      if (addedCards.length === 0) {
        toast.error(
          "Selecciona al menos una carta antes de enviar la petición."
        );
        return;
      }

      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/trade/editTradeRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            addedCards: addedCards,
          }),
        }
      );

      if (response.ok) {
        await response.json();
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
      <h1 className="flex justify-center items-center text-2xl font-bold text-white mt-4">
        You received a trade request from {""}
        {tradeData?.tradeRequest?.requester?.userId.name}
      </h1>
      <div className="flex justify-center items-center mt-2">
        <Button
          onClick={handleSendRequestClick}
          className="bg-slate-800 px-4 py-2 text-white rounded-md hover:hover:bg-black text-2xl font-bold  cursor-pointer relative transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
        >
          Enviar petición
        </Button>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        {/* Sección izquierda */}
        <div className="w-full md:w-1/2 p-4 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Seleccione las cartas que va a ofrecer</p>
          </h1>
          <Input
            type="text"
            className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Find cards..."
            value={searchTermLeft}
            onChange={(e) => setSearchTermLeft(e.target.value)}
          />
          {!userCardsError && userCards && userCards.length > 0 && (
            <div className="flex flex-wrap mt-5 gap-[20px]">
              {userCards
                .filter((card) =>
                  card?.content?.name
                    .toLowerCase()
                    .includes(searchTermLeft.toLowerCase())
                )
                .map((card, index) => (
                  <ProfileMarketCards
                    index={index}
                    key={card._id}
                    character={card.content}
                    id={card._id}
                    onCardAddedToTrade={handleCardAddedToTrade}
                    isSelected={addedCards.includes(card._id)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Sección derecha */}
        <div className="w-full md:w-1/2 p-4 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Cartas que recibe</p>
          </h1>

          <Input
            type="text"
            className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Find cards..."
            value={searchTermRight}
            onChange={(e) => setSearchTermRight(e.target.value)}
          />

          {tradeData?.tradeRequest?.requester?.cardsOffered && (
            <div className="flex flex-wrap mt-5 gap-[20px]">
              {tradeData.tradeRequest.requester.cardsOffered
                .filter((card) =>
                  card?.content?.name
                    .toLowerCase()
                    .includes(searchTermRight.toLowerCase())
                )
                .map((card, index) => (
                  <RenderUserCards
                    key={index}
                    character={card.content}
                    index={index}
                    id={card._id}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceivedTrade;

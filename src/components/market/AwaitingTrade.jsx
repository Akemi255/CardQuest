"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import RenderUserCards from "../Cards/RenderUserCards";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AwaitingTrade = ({ id, tradeData }) => {
  const router = useRouter();
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [searchTermRight, setSearchTermRight] = useState("");

  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleSendRequestClick = async () => {
    try {
      if (isRequestSent) {
        toast.error("La solicitud ya ha sido enviada.");
        return;
      }

      const requesterCards =
        tradeData?.tradeRequest?.requester?.cardsOffered || [];
      const targetUserCards =
        tradeData?.tradeRequest?.targetUser?.cardsOffered || [];

      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/trade/acceptTradeRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            requesterCards: requesterCards,
            targetUserCards: targetUserCards,
          }),
        }
      );

      if (response.ok) {
        await response.json();
        toast.success("Trade completed successfully");
        setIsRequestSent(true);
        setTimeout(() => {
          router.push("/trade");
        }, 200);
      } else {
        toast.error("Ha ocurrido un error en el envío de cartas");
      }
    } catch (error) {
      toast.error("Ups... ha ocurrido un error");
      console.log("a");
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center text-2xl font-bold text-white mt-4">
        {tradeData?.tradeRequest?.requester?.userId?.name && (
          <p>{`Press accept to end the trade with ${tradeData.tradeRequest.targetUser.userId.name}`}</p>
        )}
      </h1>
      <div className="flex justify-center items-center mt-2">
        <Button
          onClick={handleSendRequestClick}
          className="bg-slate-800 px-4 py-2 text-white rounded-md hover:hover:bg-black text-2xl font-bold  cursor-pointer relative transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
        >
          Accept
        </Button>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        {/* Sección izquierda */}
        <div className="w-full md:w-1/2 p-4 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Cards you received</p>
          </h1>
          <Input
            type="text"
            className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Find cards..."
            value={searchTermLeft}
            onChange={(e) => setSearchTermLeft(e.target.value)}
          />
          {tradeData?.tradeRequest?.targetUser?.cardsOffered?.length > 0 && (
            <div className="flex flex-wrap mt-5 gap-[20px]">
              {tradeData.tradeRequest.targetUser.cardsOffered
                .filter((card) =>
                  card?.content?.name
                    .toLowerCase()
                    .includes(searchTermLeft.toLowerCase())
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

        {/* Sección derecha */}
        <div className="w-full md:w-1/2 p-4 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Cards you offered</p>
          </h1>

          <Input
            type="text"
            className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Find cards..."
            value={searchTermRight}
            onChange={(e) => setSearchTermRight(e.target.value)}
          />

          {tradeData?.tradeRequest?.requester?.cardsOffered?.length > 0 && (
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

export default AwaitingTrade;

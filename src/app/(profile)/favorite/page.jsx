"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { SetEmail } from "@/helpers/SetEmail";
import { ClipLoader } from "react-spinners";
import RenderFavoriteCards from "./components/RenderFavoriteCards";
import { Button } from "@/components/ui/button";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Page() {
  const email = SetEmail();

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleLoadPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const apiUrl = isEmailValid
    ? `https://api-rest-card-quest.vercel.app/api/apiCards/getFavoriteApiCards/${encodeURIComponent(
        email
      )}?page=${page}`
    : null;

  const {
    data: responseData,
    error,
    isValidating,
    mutate: mutateData,
  } = useSWR(apiUrl, fetcher);

  const favoriteCardsData = responseData?.favoriteApiCards || [];
  const totalPages = responseData?.totalPages || 0;

  const handleDeleteCard = async (cardId) => {
    const updatedData = favoriteCardsData.filter((card) => card._id !== cardId);
    await mutateData({ favoriteApiCards: updatedData, totalPages });
  };

  if (error)
    return (
      <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
        Something went wrong
      </h1>
    );

  if (!favoriteCardsData.length || isValidating)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  return (
    <div>
      {favoriteCardsData?.length === 0 ? (
        <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
          There are no favorite cards
        </h1>
      ) : (
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {favoriteCardsData?.map((card, index) => (
            <RenderFavoriteCards
              key={index}
              index={index}
              character={card}
              email={email}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mb-7">
        {page > 1 && (
          <Button
            onClick={handleLoadPrevious}
            className="bg-black hover:bg-gray-900 ml-4"
          >
            Load Previous
          </Button>
        )}

        {page < totalPages && (
          <Button
            onClick={handleLoadMore}
            className="bg-black hover:bg-gray-900 ml-3"
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

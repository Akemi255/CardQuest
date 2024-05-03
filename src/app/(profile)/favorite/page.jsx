"use client";
import useSWR, { mutate } from "swr";
import { SetEmail } from "@/helpers/SetEmail";
import { ClipLoader } from "react-spinners";
import RenderFavoriteCards from "./components/RenderFavoriteCards";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Page() {
  const email = SetEmail();

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { data, error, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/apiCards/getFavoriteApiCards/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  const handleDeleteCard = (cardId) => {
    const updatedData = data.filter((card) => card._id !== cardId);
    mutate(
      isEmailValid
        ? `https://api-rest-card-quest.vercel.app/api/apiCards/getFavoriteApiCards/${encodeURIComponent(
            email
          )}`
        : null,
      updatedData,
      false
    );
  };

  if (error)
    return (
      <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
        Something went wrong
      </h1>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  return (
    <div>
      {data?.length === 0 ? (
        <h1 className="flex justify-center items-center mt-6 text-sm md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-500">
          There is no favorites cards
        </h1>
      ) : (
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {data?.map((card, index) => (
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
    </div>
  );
}

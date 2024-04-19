"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import ExploreProfile from "./components/exploreProfile";
import RenderUserCards from "@/components/Cards/RenderUserCards";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

const page = () => {
  const userID = "654952e10ef0a1ea2aaac3a9";

  const route = useRouter();

  console.log(route);

  const { data: user } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/users/getProfileById/${userID}`,
    fetcher
  );

  const { data, error, isLoading } = useSWR(
    () =>
      `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${user.user.email}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  return (
    <>
      <ExploreProfile />
      <p className="text-white">adadadad</p>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {data?.map((card, index) => (
            <RenderUserCards
              key={index}
              index={index}
              character={card.content}
            />
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default page;

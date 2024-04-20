"use client";

import { notFound } from "next/navigation";

import ExploreProfile from "./components/exploreProfile";
import UserCards from "./components/userCards";
import { Button } from "@/components/ui/button";

const getData = async (userId) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/apiCards/sortedByCoins/1`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    notFound();
  }
};

const page = async ({ params }) => {
  const data = await getData(params.user);

  return (
    <>
      <ExploreProfile />
      {/* <UserCards data={data} /> */}
      <Button>next</Button>
      <Button>prev</Button>
    </>
  );
};

export default page;

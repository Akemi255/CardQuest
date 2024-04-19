import { notFound } from "next/navigation";
import { toast } from "react-toastify";

import ExploreProfile from "./components/exploreProfile";
import UserCards from "./components/userCards";

const getData = async (userId) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/cards/findUserCardsById/${userId}`,
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
      <UserCards data={data} />
    </>
  );
};

export default page;

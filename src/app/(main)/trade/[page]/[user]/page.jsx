import StartingTrade from "@/components/market/StartingTrade";

export const revalidate = 0;

const fetchUser = async (user) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/users/getProfileById/${user}`
    );

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error("Error al realizar la petición:", error);
  }
};

const page = async ({ params }) => {
  const data = await fetchUser(params.user);

  return (
    <>
      <StartingTrade user={params.user} data={data} />
    </>
  );
};

export default page;

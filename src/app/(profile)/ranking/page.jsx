import RankingTable from "./components/RankingTable";

export const revalidate = 0;

const getData = async () => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/users/getUsersRank?page=1`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default async function page() {
  const usersData = await getData();

  return (
    <RankingTable
      usersData={usersData.usersRank}
      totalPages={usersData.totalPages}
    />
  );
}

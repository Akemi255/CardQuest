import ReceivedTrade from "@/components/market/ReceivedTrade";

export const revalidate = 0;

const fetchData = async (id) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/trade/getTradeRequests/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trade data:", error);
  }
};

const page = async ({ params }) => {
  const ReceivedRequest = params.ReceivedRequest;

  const tradeData = await fetchData(params.ReceivedRequest);

  return (
    <>
      <ReceivedTrade id={ReceivedRequest} tradeData={tradeData} />
    </>
  );
};

export default page;

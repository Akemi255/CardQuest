import AwaitingTrade from "@/components/market/AwaitingTrade";

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
  const AwaitingRequest = params.AwaitingRequest;

  const tradeData = await fetchData(AwaitingRequest);

  return (
    <>
      <AwaitingTrade id={AwaitingRequest} tradeData={tradeData} />
    </>
  );
};

export default page;

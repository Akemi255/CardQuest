import ReceivedRequests from "./ReceivedRequests";
import AwaitingRequests from "./AwaitingRequests";
import UsersMarket from "./UsersMarket";

const MarketSection = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-4 md:ml-auto order-2 md:order-1 relative bottom-1">
        <UsersMarket />
      </div>

      {/* Sección derecha */}
      <div className="md:w-1/2 lg:w-1/5 p-2 md:mr-0 order-1 md:order-2">
        <ReceivedRequests />
        <br />
        <AwaitingRequests />
      </div>
    </div>
  );
};

export default MarketSection;

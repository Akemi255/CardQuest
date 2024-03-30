import React from "react";
import ReceivedRequests from "./ReceivedRequests";
import AwaitingRequests from "./AwaitingRequests";
import UsersMarket from "./UsersMarket";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MarketSection = () => {
  return (
    <div className="flex flex-col md:flex-col">
      <h1 className="text-[28px] font-semibold text-[#EDEDED]">users</h1>
      <div className="my-6"></div>
      <div className="w-full md:ml-auto order-2 md:order-1 relative bottom-1">
        <div>
          <p className="text-base font text-[#A0A0A0]">
            Proident ullamco sint aliquip minim fugiat.
          </p>
          <p className="text-base font text-[#A0A0A0] ">
            Proident ullamco sint aliquip minim fugiat do nisi et dolore aute
            occaecat reprehenderit.
          </p>
          <div className="flex flex-row my-6 gap-2 ">
            <div
              className={cn(
                "flex max-w-md h-10  bg-background-surface-200 items-center rounded-md border border-transparent  pl-3 text-sm ring-offset-background  focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0"
              )}
            >
              <SearchIcon className="h-[16px] w-[16px] text-primary-foreground-light " />
              <input
                type="search"
                placeholder="Search..."
                className="w-full grow text-white bg-background-surface-200  border-transparent placeholder:text-primary-foreground-light  p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button className="bg-background3">Search</Button>
          </div>
        </div>
        <Separator className="my-6 bg-[#2E2E2E]" />
        <UsersMarket />
      </div>
      {/* Sección derecha */}
      {/* <div className="md:w-1/2 lg:w-1/5 p-2 md:mr-0 order-1 md:order-2"> */}
      {/* <ReceivedRequests /> */}
      {/* Solicitudes pendientes */}
      {/* <AwaitingRequests /> */}
      {/* </div> */}
    </div>
  );
};

export default MarketSection;

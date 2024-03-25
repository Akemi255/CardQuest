import { Input } from "@/components/ui/input";
import React from "react";

export default function page() {
  return (
    <div className="m-14 mt-28 h-full w-auto flex gap-14">
      <div className="grow bg-black p-10">
        <div className="flex flex-row gap-4 items-center  ">
          <span className="text-white whitespace-nowrap">
            Items You Received :{" "}
          </span>
          <Input className="max-w-xs bg-black"></Input>
        </div>
      </div>
      <div className="grow bg-black p-10">
        <div className="flex flex-row gap-4 items-center  ">
          <span className="text-white whitespace-nowrap">
            Items You Received :{" "}
          </span>
          <Input className="max-w-xs bg-black"></Input>
        </div>
      </div>
    </div>
  );
}

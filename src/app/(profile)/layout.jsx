import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import backgroundImage from "../../../public/assets/profile-background.png";

export default function layout({ children }) {
  return (
    <main className="w-scren h-screen bg-gray-800">
      <div
        className="flex flex-row relative w-full h-60 p-4"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <div className="grow">
          <div className="flex flex-row">
            <Avatar className="h-20 w-20 mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className=" flex flex-col">
              <span>Harem: Project Main</span>
              <span>@haremprojectmaid</span>
            </div>
          </div>
        </div>
        <div className="grow">adad</div>
        {/* <div className="fixed h-full w-full left-0  top-0">
          <Image
            src={backgroundImage}
            alt=""
            layout="fill"
            objectFit="cover"
            // sizes="100vw"
          />
        </div> */}
      </div>
      {children}
    </main>
  );
}

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  PackageOpen,
  UserSearch,
  PackageSearch,
  FileBarChart,
  WalletCards,
  Settings,
  ArrowLeftRight,
  CircleDot,
  Pencil,
  AreaChart,
  Star,
  Share2,
} from "lucide-react";

export default function layout({ children }) {
  return (
    <div className="h-screen w-screen">
      <div className="w-screen h-[300px] p-4 bg-black">
        <div className="flex flex-col">
          <div>
            <div className="flx flex-row">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-4">
            <div className=" flex flex-row gap-2 text-white">
              <Pencil className="h-4   w-4" />
              <span className="text-sm">Edit</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Settings className="h-4   w-4" />
              <span className="text-sm">Settings</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Star className="h-4   w-4" />
              <span className="text-sm">Favorite</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Share2 className="h-4   w-4" />
              <span className="text-sm">Share</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <AreaChart className="h-4   w-4" />
              <span className="text-sm">Ranking</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

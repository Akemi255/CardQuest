import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Settings,
  Pencil,
  AreaChart,
  Star,
  Share2,
  UserCheck,
  Eye,
  Github,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function layout({ children }) {
  return (
    <div className="h-screen w-screen">
      <div className="w-screen h-[300px] p-4 bg-black flex flex-col">
        <div className="flex flex-col grow justify-center pt-10">
          <div className="flex flex-row gap-4">
            <div className="flx flex-row">
              <Avatar className="h-126 w-16  md:h-36 md:w-36 mx-auto">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col text-white justify-center">
              <div>
                <span className="text-lg">John Doe</span>
              </div>
              <div>
                <span className="text-lg text-gray-400">johndoe@email.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-auto py-4">
          <div className="flex flex-row gap-4">
            <div className=" flex flex-row gap-2 text-white">
              <Button>
                <Github className="h-4 w-4" />
              </Button>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Button>
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Button>
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Button>
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className=" flex flex-row gap-2 text-white">
              <Pencil className="h-4   w-4" />
              <span className="text-sm hidden md:block">Edit</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Settings className="h-4   w-4" />
              <span className="text-sm hidden md:block">Settings</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Star className="h-4   w-4" />
              <span className="text-sm hidden md:block">Favorite</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Share2 className="h-4   w-4" />
              <span className="text-sm hidden md:block">Share</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <AreaChart className="h-4   w-4" />
              <span className="text-sm hidden md:block">Ranking</span>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className=" flex flex-row gap-2 text-white">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm">200</span>
              <span className="text-sm hidden md:block">Following</span>
            </div>
            <div className=" flex flex-row gap-2 text-white">
              <Eye className="h-4 w-4" />
              <span className="text-sm ">3452</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

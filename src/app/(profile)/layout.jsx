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
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileButton from "./components/ProfileButton";
import MyDrawer from "../(main)/components/MyDrawer";
import Nav from "../(main)/components/Nav";

import SearchBar from "../(main)/components/SearchBar";
import TittleBar from "../(main)/components/TittleBar";

export default function layout({ children }) {
  return (
    <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
      <aside className="hidden md:flex w-[240px] flex-col bg-background2 border-r border-[#2E2E2E]">
        <Nav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden bg-background2  h-max md:h-auto">
        <SearchBar />
        <div className="h-auto w-full overflow-y-auto overflow-x-hidden ">
          <div className="bg-[url('/assets/background-profile.png')] bg-no-repeat bg-center bg-cover">
            <div className="w-screen py-4 container flex flex-col">
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
                      <span className="text-lg text-gray-400">
                        johndoe@email.com
                      </span>
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
              <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-row gap-4">
                  <ProfileButton
                    icon={<User className="h-4 w-4 mr-1" />}
                    href={"/profile"}
                    text={"Profile"}
                  />
                  <ProfileButton
                    icon={<Pencil className="h-4 w-4 mr-1" />}
                    href={"/edit-profile"}
                    text={"Edit Profile"}
                  />
                  <ProfileButton
                    icon={<Settings className="h-4 w-4 mr-1" />}
                    href={"/settings"}
                    text={"Settings"}
                  />
                  <ProfileButton
                    icon={<Star className="h-4 w-4 mr-1" />}
                    href={"/favorite"}
                    text={"Favorite"}
                  />
                  <ProfileButton
                    icon={<AreaChart className="h-4 w-4 mr-1" />}
                    href={"/ranking"}
                    text={"Ranking"}
                  />
                </div>
                <div className="flex flex-row gap-4 items-center">
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
          </div>
          {children}
        </div>
      </main>
      <MyDrawer />
    </div>
  );
}

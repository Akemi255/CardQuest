"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gem, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";

export default function SearchBar() {
  return (
    <div className="flex w-full items-center  p-4 gap-4 bg-black">
      <Avatar className="flex md:hidden h-8 w-8 m-auto">
        <AvatarImage src="https://github.com/shadcn.pngas" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input
        type="search"
        placeholder="Search"
        className="grow bg-black border-black placeholder:text-white"
      />
      {/* <Button variant="outline" className="md:hidden">
        Open Drawer
      </Button> */}
      <DrawerTrigger>
        <Button variant="outline" className="md:hidden p-2">
          <Menu />
        </Button>
      </DrawerTrigger>
      <div className="flex flex-row items-center gap-4">
        <Avatar className="hidden md:flex  h-10 w-10 m-auto">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-white w-28 text-lg hidden md:block">
          John Doe
        </span>
      </div>
    </div>
  );
}

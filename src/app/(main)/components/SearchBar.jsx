"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gem, Menu, Settings, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Search } from "./SearchInput";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchBar() {
  return (
    <div className="flex w-full items-center  p-4 gap-4 bg-background2 border-b border-border-grey">
      <Avatar className="flex md:hidden h-8 w-8 m-auto">
        <AvatarImage src="https://github.com/shadcn.pngas" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* <Input
        type="search"
        placeholder="Search"
        className="grow bg-black border-black placeholder:text-white"
      /> */}

      <Search />

      {/* <Button variant="outline" className="md:hidden">
        Open Drawer
      </Button> */}
      <DrawerTrigger>
        {/* Dibawah ini bisa jadi error */}
        <Button variant="outline" className="md:hidden p-2">
          <Menu />
        </Button>
      </DrawerTrigger>
      <div className="hidden md:flex flex-row items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-background-surface-200 bg-background2 border-border-button  flex flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter border "
            >
              <div className="flex h-10 w-10  justify-center items-center">
                <Avatar className="h-7 w-7 ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-col flex w-auto text-start">
                <p className="text-[13px] ">John Doe</p>
                <p className="text-xs text-clip overflow-hidden">
                  arrofirezasatria@gmail.com
                </p>
              </div>
              <span className="h-10 w-8 flex items-center justify-center rounded">
                <EllipsisVertical className="h-5 w-5" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 bg-background2 text-white bottom-7 data-[state=open]:data-[side=bottom]:!left-5 border border-border-overlay shadow-lg border-spacing-3 "
            sideOffset={8}
            align="end"
          >
            <div className="flex flex-col"></div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

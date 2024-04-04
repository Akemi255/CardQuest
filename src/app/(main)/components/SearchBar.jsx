"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Gem,
  Menu,
  Settings,
  EllipsisVertical,
  User,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Search } from "./SearchInput";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export default function SearchBar() {
  const [mounted, setIsMounted] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {mounted && (
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

          <div
            variant="outline"
            className="bg-none text-[13px]  border-border-button w-auto h-auto flex flex-row justify-start items-center gap-2 py-1 px-2 rounded-full text-primary-foreground-morelighter hover:text-primary-foreground-morelighter border"
          >
            <Gem className="h-4 w-4 text-white" />
            <span className="-mb-[1px]">123</span>
          </div>
          <div className="hidden md:flex flex-row items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-background-surface-200 bg-background2 border-border-button w-[240px] flex flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter border "
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
                className="w-[240px] bg-background-surface-100 text-white bottom-7 p-1 data-[state=open]:data-[side=bottom]:!left-5 border border-border-overlay shadow-lg border-spacing-3 "
                sideOffset={8}
                align="end"
              >
                <Link
                  href={"/profile"}
                  className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start  text-primary-foreground-light"
                >
                  <User className="w-[14px] h-[14px] mr-2" />
                  Profile
                </Link>
                <Button className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start text-primary-foreground-light">
                  <Settings className="w-[14px] h-[14px] mr-2" />
                  Prefference
                </Button>
                <Separator className="bg-[#2E2E2E] my-1" />
                <Label className="flex flex-col bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start items-start text-primary-foreground-light">
                  Theme
                </Label>
                <RadioGroup
                  defaultValue="comfortable"
                  className="text-primary-foreground-light"
                >
                  <div className="flex items-center space-x-2 hover:bg-background-surface-300 border-sm pl-2">
                    <RadioGroupItem
                      value="default"
                      id="r1"
                      className="border-none text-primary-foreground-lighter "
                    />
                    <Label
                      htmlFor="r1"
                      className="text-xs w-full p-1 !ml-[2px]"
                    >
                      System
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 hover:bg-background-surface-300 border-sm pl-2">
                    <RadioGroupItem
                      value="comfortable"
                      id="r2"
                      className="border-none text-primary-foreground-lighter "
                    />
                    <Label
                      htmlFor="r2"
                      className="text-xs w-full p-1 !ml-[2px]"
                    >
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 hover:bg-background-surface-300 border-sm pl-2">
                    <RadioGroupItem
                      value="compact"
                      id="r3"
                      className="border-none text-primary-foreground-lighter "
                    />
                    <Label
                      htmlFor="r3"
                      className="text-xs w-full p-1 !ml-[2px]"
                    >
                      Dark
                    </Label>
                  </div>
                </RadioGroup>
                <Separator className="bg-[#2E2E2E] my-1" />
                <Button
                  onClick={handleSignOut}
                  className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start text-primary-foreground-light"
                >
                  <LogOut className="w-[14px] h-[14px] mr-2" />
                  Log out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}

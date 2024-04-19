"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { Gem, Menu, User, LogOut, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { Search } from "./SearchInput";
import { SetEmail } from "@/helpers/SetEmail";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function SearchBar() {
  const [mounted, setIsMounted] = useState(false);
  let email = SetEmail();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { data, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/users/ProfileWithEmail/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  return (
    <>
      {mounted && (
        <div className="flex w-full items-center p-4 gap-4 bg-blackBackground border-border-grey">
          <Avatar className="flex md:hidden h-8 w-8 m-auto">
            <AvatarImage src={data?.image} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Search />
          <DrawerTrigger>
            <Button variant="outline" className="md:hidden p-2">
              <Menu />
            </Button>
          </DrawerTrigger>

          <div
            variant="outline"
            className="bg-background-surface-200 text-[13px]  border-border-button w-auto h-auto hidden md:flex flex-row justify-start items-center gap-2 py-1 px-2 rounded-full text-primary-foreground-morelighter hover:text-primary-foreground-morelighter border"
          >
            <Gem className="h-4 w-4 text-white" />
            <span className="-mb-[1px]">{data?.coins}</span>
          </div>
          <div className="hidden md:flex flex-row items-center gap-4">
            <Popover>
              <PopoverTrigger asChild className="border-none">
                <Button
                  variant="outline"
                  className="hover:bg-background-surface-200 bg-background-surface-200 border-border-button w-[240px] flex flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter border "
                >
                  {isLoading ? (
                    <ClipLoader
                      color={"#ffffff"}
                      loading={isLoading}
                      size={20}
                    />
                  ) : (
                    <>
                      <div className="flex h-10 w-10 justify-center items-center">
                        <Avatar className="h-9 w-9 relative right-1 ">
                          {data?.image ? (
                            <Image
                              src={data?.image}
                              alt="Avatar"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="h-screen flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
                              <ClipLoader
                                color={"#ffffff"}
                                loading={isLoading}
                                size={20}
                              />
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex-col flex w-auto text-start">
                        <p className="text-[13px] ">{data?.name}</p>
                        <p className="text-xs text-clip overflow-hidden">
                          {data?.email}
                        </p>
                      </div>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[240px] bg-background-surface-200 text-white bottom-7 p-1 data-[state=open]:data-[side=bottom]:!left-5 border border-border-overlay shadow-lg border-spacing-3 "
                sideOffset={8}
                align="end"
              >
                <Link
                  href={"/"}
                  className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start  text-primary-foreground-light"
                >
                  <Home className="w-[14px] h-[14px] mr-2" />
                  Home
                </Link>
                <Link
                  href={"/profile"}
                  className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start  text-primary-foreground-light"
                >
                  <User className="w-[14px] h-[14px] mr-2" />
                  Profile
                </Link>
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

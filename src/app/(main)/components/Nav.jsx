"use client";

import React, { useState } from "react";
import {
  PackageOpen,
  UserSearch,
  PackageSearch,
  FileBarChart,
  WalletCards,
  Settings,
  ArrowLeftRight,
  CircleDot,
  Store,
  CircleUserRound,
  User,
  EllipsisVertical,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Links = [
  {
    title: "Drop",
    href: "/",
    label: "128",
    icon: PackageOpen,
    variant: "default",
    separator: false,
    subMenu: null,
  },
  // {
  //   title: "Trade",
  //   href: "/one",
  //   label: "128",
  //   icon: WalletCards,
  //   variant: "default",
  //   subMenu: null,
  // },

  {
    title: "Card Ranking",
    href: "/ranking",
    label: "128",
    icon: FileBarChart,
    variant: "default",
    separator: false,
    subMenu: null,
  },
  {
    title: "Explore",
    href: "/explore",
    label: "128",
    icon: PackageSearch,
    variant: "default",
    separator: false,
    subMenu: null,
  },
  {
    title: "User Search",
    href: "/searchuser",
    label: "128",
    icon: UserSearch,
    variant: "default",
    separator: false,
    subMenu: null,
  },
  {
    title: "Trade",
    href: "/one",
    label: "128",
    icon: WalletCards,
    variant: "default",
    separator: true,
    subMenu: [
      {
        title: "Swap",
        href: "/swap",
        label: "128",
        icon: ArrowLeftRight,
        variant: "default",
        subMenu: null,
      },
      {
        title: "Swap Card",
        href: "/swap-card",
        label: "128",
        icon: ArrowLeftRight,
        variant: "default",
        subMenu: null,
      },
      {
        title: "The Choosen",
        href: "/choosen",
        label: "128",
        icon: CircleDot,
        variant: "default",
        subMenu: null,
      },
    ],
  },
  {
    title: "Store",
    href: "/store",
    label: "128",
    icon: Store,
    variant: "default",
    separator: false,
    subMenu: null,
  },
  // {
  //   title: "Profile",
  //   href: "/store",
  //   label: "128",
  //   icon: Store,
  //   variant: "default",
  //   separator: false,
  //   subMenu: null,
  // },
];

export default function Nav() {
  const path = usePathname();
  const [isCollapsible, setIsCollapsible] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-background2 justify-between h-full">
      <div className="flex flex-col gap-4 p-2 py-4 text-center">
        <Button
          variant="outline"
          className="hover:bg-background-surface-200 bg-background2 border-none flex flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter"
        >
          {/* <span className="h-10 w-10 flex items-center justify-center rounded "> */}
          {/* <CircleUserRound className="w-5 h-5 bg-white rounded" /> */}
          <div className="flex h-10 w-10 justify-center items-center mx-2">
            <Avatar className="h-10 w-10 ">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* </span> */}

          {/* <span className="h-100">a</span> */}

          <div className="flex-col flex w-auto text-start">
            <h1 className="text-[16px]">CARD QUEST</h1>
          </div>
        </Button>
        {/* <span className="mt-[10.5px] text-white text-base">Card Quest</span> */}
      </div>

      <nav className="grid items-start gap-y-2 p-3">
        {Links.map((link, index) => {
          return (
            <>
              {link.subMenu ? (
                <>
                  {link.separator && <Separator className="bg-[#2E2E2E]" />}
                  <button
                    onClick={() => setIsCollapsible((prev) => !prev)}
                    className="mt-auto"
                  >
                    <span
                      className={cn(
                        "group flex items-center rounded-sm text-sm font-medium hover:bg-background-surface-200 hover:text-primary-foreground-morelighter  text-primary-foreground-light transition-all",
                        path === "settings"
                          ? "bg-background-surface-200 "
                          : "transparent",
                        false && "cursor-not-allowed opacity-80"
                      )}
                    >
                      <span className="h-10 w-10 flex items-center justify-center rounded">
                        <link.icon className="h-5 w-5" />
                      </span>
                      <span className="text-[13px]">{link.title}</span>
                    </span>
                  </button>
                  {isCollapsible && (
                    <>
                      {link.subMenu.map((sublink, index) => {
                        return (
                          <Link
                            key={index}
                            href={sublink.href}
                            className="mt-auto"
                          >
                            <span
                              className={cn(
                                "group flex items-center rounded-sm text-sm font-medium hover:bg-background-surface-200 hover:text-primary-foreground-morelighter  text-primary-foreground-light transition-all",
                                path === "settings"
                                  ? "bg-background-surface-200"
                                  : "transparent",
                                false && "cursor-not-allowed opacity-80"
                              )}
                            >
                              <span className="h-10 w-10 flex items-center justify-center rounded">
                                <sublink.icon className="h-5 w-5" />
                              </span>
                              <span className="text-[13px]">
                                {sublink.title}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <Link key={index} href={link.href}>
                  <span
                    className={cn(
                      "group flex items-center rounded-sm text-sm font-medium hover:bg-background-surface-200 hover:text-primary-foreground-morelighter  text-primary-foreground-light transition-all",
                      path === link.href
                        ? "bg-background-surface-200 text-primary-foreground-morelighter"
                        : "transparent",
                      false && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <span className="h-10 w-10 flex items-center justify-center rounded">
                      <link.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[13px]">{link.title}</span>
                  </span>
                </Link>
              )}
            </>
          );
        })}
        {/* <Separator className="bg-[#2E2E2E]" /> */}
      </nav>

      <div className="hidden md:flex"></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-background-surface-200 bg-background2 border-border-button w-auto flex md:hidden flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter border mx-2 mb-2 "
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
          <Button className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start  text-primary-foreground-light">
            <User className="w-[14px] h-[14px] mr-2" />
            Profile
          </Button>
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
              <Label htmlFor="r1" className="text-xs w-full p-1 !ml-[2px]">
                System
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-background-surface-300 border-sm pl-2">
              <RadioGroupItem
                value="comfortable"
                id="r2"
                className="border-none text-primary-foreground-lighter "
              />
              <Label htmlFor="r2" className="text-xs w-full p-1 !ml-[2px]">
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-background-surface-300 border-sm pl-2">
              <RadioGroupItem
                value="compact"
                id="r3"
                className="border-none text-primary-foreground-lighter "
              />
              <Label htmlFor="r3" className="text-xs w-full p-1 !ml-[2px]">
                Dark
              </Label>
            </div>
          </RadioGroup>
          <Separator className="bg-[#2E2E2E] my-1" />
          <Button className="flex flex-row justify-start items-center bg-transparent hover:bg-background-surface-300 w-full text-xs px-2 py-[6px] h-auto text-start text-primary-foreground-light">
            <LogOut className="w-[14px] h-[14px] mr-2" />
            Log out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

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
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";

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
  {
    title: "Trade",
    href: "/one",
    label: "128",
    icon: WalletCards,
    variant: "default",
    subMenu: null,
  },

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
    title: "Users",
    href: "/users/1",
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
    <div className="flex flex-col gap-2 bg-background2 h-full !bg-[#252736]">
      <div className="flex flex-col gap-4 p-2 py-4 text-center justify-center align-middle items-center">
        <Avatar className="h-20 w-20 ">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="mt-[10.5px] text-white text-base">
          Harem: Project Maid
        </span>
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
      </nav>
      {/* 
      <Link href={"/Settings"} className="m-3">
        <span
          className={cn(
            "group flex items-center rounded-sm text-sm font-medium hover:bg-background-surface-200 hover:text-primary-foreground-morelighter  text-primary-foreground-light transition-all",
            path === "/Settings"
              ? "bg-background-surface-200 text-primary-foreground-morelighter"
              : "transparent",
            false && "cursor-not-allowed opacity-80"
          )}
        >
          <span className="h-10 w-10 flex items-center justify-center rounded">
            <Settings className="h-5 w-5" />
          </span>
          <span className="text-[13px]">Settings</span>
        </span>
      </Link> */}

      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-background-surface-200 bg-background2 border-border-button m-3 flex flex-row justify-start h-auto p-0 text-primary-foreground-light hover:text-primary-foreground-morelighter border "
          >
            <div className="flex h-10 w-10 justify-center items-center">
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover> */}
    </div>
  );
}

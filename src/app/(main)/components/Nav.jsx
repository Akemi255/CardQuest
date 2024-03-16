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
} from "lucide-react";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Links = [
  {
    title: "Drop",
    href: "/",
    label: "128",
    icon: PackageOpen,
    variant: "default",
    subMenu: null,
  },
  {
    title: "Trade",
    href: "/one",
    label: "128",
    icon: WalletCards,
    variant: "default",
    subMenu: [
      {
        title: "Swap",
        href: "/one",
        label: "128",
        icon: ArrowLeftRight,
        variant: "default",
        subMenu: null,
      },
      {
        title: "Swap Card",
        href: "/one",
        label: "128",
        icon: ArrowLeftRight,
        variant: "default",
        subMenu: null,
      },
      {
        title: "The Choosen",
        href: "/one",
        label: "128",
        icon: CircleDot,
        variant: "default",
        subMenu: null,
      },
    ],
  },
  {
    title: "Card Ranking",
    href: "/two",
    label: "128",
    icon: FileBarChart,
    variant: "default",
    subMenu: null,
  },
  {
    title: "Explore",
    href: "/three",
    label: "128",
    icon: PackageSearch,
    variant: "default",
    subMenu: null,
  },
  {
    title: "User Search",
    href: "/usersearch",
    label: "128",
    icon: UserSearch,
    variant: "default",
    subMenu: null,
  },
];

export default function Nav() {
  const path = usePathname();
  const [isCollapsible, setIsCollapsible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-2 py-4 bg-blue-100 text-center">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src="https://github.com/shadcn.pngas" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="mt-[10.5px]">John Doe</span>
      </div>
      <nav className="grid items-start gap-2 p-2">
        {Links.map((link, index) => {
          return (
            <>
              {link.subMenu ? (
                <>
                  <button
                    onClick={() => setIsCollapsible((prev) => !prev)}
                    className="mt-auto"
                  >
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        path === "settings" ? "bg-accent" : "transparent",
                        false && "cursor-not-allowed opacity-80"
                      )}
                    >
                      <link.icon className="mr-2 h-6 w-6" />
                      <span className="text-base">{link.title}</span>
                    </span>
                  </button>
                  {isCollapsible && (
                    <>
                      {link.subMenu.map((sublink, index) => {
                        return (
                          <Link key={index} href={"/adasd"} className="mt-auto">
                            <span
                              className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground pl-8",
                                path === "settings"
                                  ? "bg-accent"
                                  : "transparent",
                                false && "cursor-not-allowed opacity-80"
                              )}
                            >
                              <sublink.icon className="mr-2 h-4 w-4" />
                              <span>{sublink.title}</span>
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
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === link.href ? "bg-accent" : "transparent",
                      false && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <link.icon className="mr-2 h-6 w-6" />
                    <span className="text-base">{link.title}</span>
                  </span>
                </Link>
              )}
            </>
          );
        })}
      </nav>
    </div>
  );
}

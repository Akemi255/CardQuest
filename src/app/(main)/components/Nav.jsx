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
} from "lucide-react";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

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
  {
    title: "Profile",
    href: "/store",
    label: "128",
    icon: Store,
    variant: "default",
    separator: false,
    subMenu: null,
  },
];

export default function Nav() {
  const path = usePathname();
  const [isCollapsible, setIsCollapsible] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-background2 ">
      <div className="flex flex-col gap-4 p-2 py-4 text-center">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src="https://github.com/shadcn.pngas" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="mt-[10.5px] text-white text-base">Card Quest</span>
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
    </div>
  );
}

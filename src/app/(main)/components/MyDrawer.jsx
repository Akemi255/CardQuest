"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import MobileNav from "./Nav";

export default function MyDrawer() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <DrawerContent className="h-screen rounded-none w-3/4 bg-[#252736] border-transparent">
      {/* <div className="mx-auto w-full max-w-sm"> */}
      {/* <DrawerHeader> */}
      {/* <DrawerTitle>Move Goal</DrawerTitle> */}
      {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
      {/* </DrawerHeader> */}
      <MobileNav />
      {/* <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter> */}
      {/* </div> */}
    </DrawerContent>
  );
}

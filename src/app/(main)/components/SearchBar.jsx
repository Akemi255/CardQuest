import React from "react";
import { Input } from "@/components/ui/input";
import { Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";

export default function SearchBar() {
  return (
    <div className="flex w-full  p-4 border gap-4 ">
      <DrawerTrigger>
        <Button>ad</Button>
      </DrawerTrigger>
      <Input type="search" placeholder="Search" className="grow" />
      <div className="flex items-center gap-2">
        <Gem className="w-5 h-5" />
        <span>437</span>
      </div>
    </div>
  );
}

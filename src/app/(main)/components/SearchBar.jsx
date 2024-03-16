import React from "react";
import { Input } from "@/components/ui/input";
import { Gem } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex w-full  p-4 border gap-4 ">
      <Input type="search" placeholder="Search" className="grow" />
      <div className="flex items-center gap-2">
        <Gem className="w-5 h-5" />
        <span>437</span>
      </div>
    </div>
  );
}

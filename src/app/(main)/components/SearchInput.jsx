import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Search = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex w-full h-10 bg-[#171928] items-center rounded-md border border-input  pl-3 text-sm ring-offset-background  focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <SearchIcon className="h-[16px] w-[16px] text-white" />
      <input
        {...props}
        type="search"
        ref={ref}
        className="w-full grow bg-[#171928] border-black placeholder:text-white  p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});

Search.displayName = "Search";

export { Search };

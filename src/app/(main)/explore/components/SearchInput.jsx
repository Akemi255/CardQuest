import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

const SearchInput = React.forwardRef(
  ({ className, onNewSearch = () => {}, ...props }, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const onSearch = (event) => {
      event.preventDefault();
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const pageNumber = "1";
      const encodedPage = encodeURIComponent(pageNumber);
      router.push(
        `/explore/search?q=${encodedSearchQuery}&page=${encodedPage}`
      );
      onNewSearch();
    };

    return (
      <form
        onSubmit={onSearch}
        className={cn(
          "flex w-full h-10 bg-blackBackground items-center rounded-md border border-input border-black  pl-3 text-sm ring-offset-background  focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0",
          className
        )}
      >
        <SearchIcon className="h-[16px] w-[16px] text-white" />
        <input
          {...props}
          type="search"
          placeholder="Search for cards..."
          ref={ref}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full grow text-white bg-blackBackground border-black placeholder:text-white  p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </form>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };

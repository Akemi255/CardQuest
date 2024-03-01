"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput =  ({ onNewSearch = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState("1");

  if (typeof searchQuery !== "string") {
    return;
  }

  const onSearch = (event) => {

    event.preventDefault();
    
    const encodedSearchQuery = encodeURI(searchQuery);
    let pageNumber = "1"
    const encodedPage = encodeURI(pageNumber); 
    router.push(`/cards/1/search?q=${encodedSearchQuery}&page=${encodedPage}`);
    onNewSearch();
  };

  return (
    <form onSubmit={onSearch} className="flex justify-center w-2/3">
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        placeholder="Buscar carta"
      />
    </form>
  );
};

export default SearchInput;

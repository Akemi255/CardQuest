"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Search = async () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    // params.set("page", "1");

    console.log(term);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (term) => {
    const params = new URLSearchParams(searchParams);
    console.log(term);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // replace(`${pathname}?${params.toString()}`);
  };

  return (
    // <div className="relative flex flex-1 flex-shrink-0">
    //   <label htmlFor="search" className="sr-only">
    //     Search
    //   </label>
    //   <Input
    //     className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
    //     onChange={(e) => {
    //       handleSearch(e.target.value);
    //     }}
    //     defaultValue={searchParams.get("query")?.toString()}
    //   />
    // </div>
    <div>
      <form onSubmit={handleSearchSubmit}>
        <Input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          // onChange={(e) => {
          //   handleSearch(e.target.value);
          // }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <input type={"submit"} placeholder="submit" />
      </form>
    </div>
  );
};

export default Search;

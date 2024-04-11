import { Input } from "@/components/ui/input";
import React from "react";

export default async function Search() {
  const handleSearch = (term) => {
    console.log(term);
  };

  const handleSubmit = (event) => {
    event.preventdDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <input type="submit" placeholder="submit" />
      </form>
    </div>
  );
}

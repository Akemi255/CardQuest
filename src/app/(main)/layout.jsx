import React from "react";
import Nav from "./components/Nav";

import SearchBar from "./components/SearchBar";
import TittleBar from "./components/TittleBar";

export default function layout({ children }) {
  return (
    <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
      <aside className="hidden w-[240px] flex-col md:flex border">
        <Nav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden border">
        <SearchBar />
        <TittleBar />
        {children}
      </main>
    </div>
  );
}

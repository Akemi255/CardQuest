"use client";

import React, { useEffect, useState } from "react";
import MyDrawer from "./components/MyDrawer";
import Nav from "./components/Nav";

import SearchBar from "./components/SearchBar";
import TittleBar from "./components/TittleBar";

export default function layout({ children }) {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
          <aside className="hidden md:flex w-[240px] flex-col bg-background2 border-r border-[#2E2E2E]">
            <Nav />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden bg-background2  h-max md:h-auto">
            <SearchBar />
            <div className="overflow-y-scroll">{children}</div>
          </main>
          <MyDrawer />
        </div>
      )}
    </>
  );
}

"use client";
import { useEffect, useState } from "react";

import MyDrawer from "./components/MyDrawer";
import SearchBar from "./components/SearchBar";

export default function Layout({ children }) {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="grid flex-1 md:grid-cols-[1fr] h-screen">
          <main className="flex w-full flex-1 flex-col overflow-hidden bg-background2">
            <SearchBar />
            <div className="overflow-y-scroll h-full">{children}</div>
          </main>
          <MyDrawer />
        </div>
      )}
    </>
  );
}

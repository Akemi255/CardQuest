"use client";

import React from "react";
import MyDrawer from "./components/MyDrawer";
import Nav from "./components/Nav";

import SearchBar from "./components/SearchBar";
import TittleBar from "./components/TittleBar";

export default function layout({ children }) {
  return (
    <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
      <aside className="hidden md:flex w-[240px] flex-col bg-[#252736] ">
        <Nav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden bg-[#171928]  h-max md:h-auto">
        <SearchBar />
        {/* <TittleBar /> */}
        {children}
      </main>
      <MyDrawer />
    </div>
  );
}

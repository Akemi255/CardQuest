"use client";

import React from "react";
import useSWR from "swr";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function page() {
  const email = "gus1465@aol.com";

  const { data, error, isLoading } = useSWR(
    `https://api-rest-card-quest.vercel.app/api/cards/findUserCards/${email}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div className="">loading...</div>;

  console.log(data);

  return (
    <div className="text-white">
      {data.map(() => (
        <p className="text-white">asd</p>
      ))}
    </div>
  );
}

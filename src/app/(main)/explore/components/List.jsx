import React, { Suspense } from "react";

export default async function List({ query, currentPage }) {
  // console.log(query);

  // const res = await fetch(
  //   `https://api-rest-card-quest.vercel.app/api/apiCards/searchCards/1/${
  //     query === "" ? "a" : query
  //   }`,
  //   {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ email: "gus1465@aol.com" }),
  //   }
  // );

  // const cards = await res.json();
  // console.log(cards);

  return (
    <div>
      <p>{query}</p>

      {/* <Suspense fallback={<p className="text-white">loading...</p>}>
        {cards.cards.map((card) => (
          <p className="text-white">{card.name}</p>
        ))}
      </Suspense> */}
    </div>
  );
}

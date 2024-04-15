"use client";

import { useParams } from "next/navigation";

const page = () => {
  const { user } = useParams();

  return <div>page for a user {user}</div>;
};

export default page;

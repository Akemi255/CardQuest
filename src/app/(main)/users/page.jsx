"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  router.push("/users/1");
  return <></>;
};

export default page;

import { redirect } from "next/navigation";

const page = () => {
  redirect("/users/1");
};

export default page;

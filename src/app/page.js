"use client";
import Cards from "@/components/Cards";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useUser } from "@clerk/nextjs";



export default function Home() {
  let email = ""
  const user = useUser();
  if (user?.user?.primaryEmailAddress) {
    email = user.user.primaryEmailAddress.emailAddress;
    console.log(email);
    localStorage.setItem("email", email);
  }
  
  return (
    <>
      <Header />
      <Cards />
      <Footer />
    </>
  );
}

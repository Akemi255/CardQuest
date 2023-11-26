"use client";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";


const Logout = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("clerk-db-jwt");
      window.location.reload();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className="cursor-pointer text-lg font-bold hover:text-gray-300 transition duration-300 ease-in-out"
      onClick={handleLogout}
    >
      <IoLogOutOutline size={28}/>
    </div>
  );
};

export default Logout;

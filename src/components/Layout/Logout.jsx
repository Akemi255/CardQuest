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
      className="flex justify-center items-center cursor-pointer"
      onClick={handleLogout}
    >
      <IoLogOutOutline className="text-2xl sm:text-lg mr-2 sm:mr-2" size={28}/>Cerrar sesión
    </div>
  );
};

export default Logout;

// Logout.js
"use client";
import Link from "next/link";

const Logout = () => {
  

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
    localStorage.removeItem("clerk-db-jwt");
    }
   
  };

  return (
    <button
      className="header-button text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out flex items-center"
      onClick={handleLogout}
    >
     <Link href="/sign-in">Logout</Link>
    </button>
  );
};

export default Logout;

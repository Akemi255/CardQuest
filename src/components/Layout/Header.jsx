import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Logout from "./Logout";
import { SignOutButton, UserButton } from "@clerk/nextjs";


const Header = () => {
  return (
    <div className="bg-gray-700 text-white flex justify-between items-center w-full">
      <div className="flex items-center ml-4 sm:ml-8">
        <button className="header-button text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out flex items-center">
          <Link href={"/users"} className="flex items-center">
            <AiOutlineSearch className="text-2xl sm:text-lg sm:mr-2" />
            <span className="hidden sm:inline-block">Explorar</span>
          </Link>
        </button>
      </div>

      <div className="text-xl font-bold flex items-center justify-center">
        <Link href={"/"}>
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-40 h-15 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex justify-end items-center mr-4 sm:mr-8 gap-3">
        {/* Ajuste de margen para el último elemento */}
        <button className="header-button text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out flex items-center">
          <Link href="/dashboard" className="flex items-center">
          <BiUser className="text-2xl sm:text-lg mr-2 sm:mr-2" />
          <span className="hidden sm:inline-block">Mi perfil</span>
          </Link>
        </button>

        <Logout/>
      </div>
    </div>
  );
};

export default Header;

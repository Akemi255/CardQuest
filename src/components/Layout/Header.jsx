import Link from "next/link";
import { BiUser } from "react-icons/bi";
import Logout from "./Logout";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="bg-gray-700 text-white flex justify-between items-center w-full">
      <div className="flex items-center ml-4">
      <Menu />
      </div>

      <div className="text-xl font-bold flex items-center justify-center relative left-4">
        <Link href={"/"}>
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-40 h-15 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex justify-end items-center mr-4 gap-3">
        {/* Ajuste de margen para el último elemento */}
        <button className="header-button text-lg font-bold hover:text-gray-300 transition duration-300 ease-in-out flex items-center">
          <Link href="/dashboard" className="flex items-center">
          <BiUser className="text-2xl sm:text-lg mr-1 sm:mr-1" />
          <span className="sm:inline-block">Perfil</span>
          </Link>
        </button>

        
      </div>
    </div>
  );
};

export default Header;

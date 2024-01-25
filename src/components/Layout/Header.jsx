import Link from "next/link";
import { BiUser } from "react-icons/bi";
import Logout from "./Logout";
import Menu from "./Menu";
import '/public/css/header.css';
import UserIcon from "./user-icon";

const Header = () => {
  return (
    <div className="cont text-white flex justify-between items-center w-full">
      <div className="flex items-center ml-4 men">
      <Menu />
      </div>

      <div className="text-xl font-bold flex items-center justify-center logo">
        <Link href={"/"}>
          <img
            src="/assets/logo2.png"
            alt="logo"
            className="w-40 h-15 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex justify-end items-center mi-p mr-4">
        {/* Ajuste de margen para el último elemento */}
        <button className="text-lg hover:text-gray-300 transition duration-300 ease-in-out flex items-center">
          <Link href="/dashboard" className="flex items-center">
          <img src="/assets/foto-perfil.png" alt="" className="foto-perfil"/>
          <span className="sm:inline-block">Mi perfil</span>
          </Link>
        </button>

        
      </div>
    </div>
  );
};

export default Header;

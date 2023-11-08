import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { AiOutlineSearch } from 'react-icons/ai';
import Logout from "./logout";



const Header = () => {
  return (
    <div className="bg-gray-700 text-white flex justify-between items-center">
      <div className="flex items-center ml-8">
        <button className="header-button text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out flex items-center">
        <AiOutlineSearch />
          Explorar usuarios
        </button>
      </div>

      <div className="text-xl font-bold flex items-center justify-center ">
        <Link href={"/"}>
        <img
          src="/assets/logo.png"
          alt="logo"
          className="w-40 h-15 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
        />
        </Link>
      </div>

      <div className="flex justify-center items-center mr-20 gap-3">
        
      <Link href="/dashboard">
          <button className="header-button text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out flex items-center">
            <BiUser />
            Mi perfil
          </button>
        </Link>
       
      </div>
    </div>
  );
};

export default Header;

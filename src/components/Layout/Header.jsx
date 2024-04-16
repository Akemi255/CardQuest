import Link from "next/link";
import Menu from "./Menu";
import UserIcon from "./user-icon";

const Header = () => {
  return (
    <div className="cont text-white flex justify-between items-center w-full">
      <div className="flex items-center ml-4 men">
        <Menu />
      </div>

      <div className="flex justify-end items-center mi-p mr-4">
        {/* Ajuste de margen para el último elemento */}
        <button className="text-lg hover:text-gray-300 transition duration-300 ease-in-out flex items-center">
          <Link href="/dashboard" className="flex items-center">
            <UserIcon />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;

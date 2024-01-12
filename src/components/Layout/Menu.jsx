"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { GiCardBurn } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import Logout from "./Logout";
import { IoCloseCircle } from "react-icons/io5";
import Link from "next/link";
import UserIcon from "./user-icon";
import Settings from "../UserProfile/Settings";

const Menu = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setMenuActive(false);
    setMenuClosing(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (menuActive) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuActive]);

  return (
    <div>
      <IoMdMenu size={30} onClick={toggleMenu} className="cursor-pointer" />

      <div
        ref={menuRef}
        className={`menu fixed top-0 left-0 ${
          menuActive ? "w-80 opacity-100" : "w-0 opacity-0"
        } max-w-300 h-full bg-gray-800 text-white z-20 ${
          menuClosing
            ? "transition-opacity duration-300"
            : "transition-width duration-300"
        } overflow-y-auto`}
      >
        <ul className="flex flex-col items-center h-full">
          <div className="top mb-20">
            <li>
              <img
                src="/assets/logo.png"
                alt="logo"
                style={{ width: "150px" }}
                className="relative left-9"
              />
            </li>
            <li>
              <Link
                href="/users"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <AiOutlineSearch className="text-2xl sm:text-lg sm:mr-2" />
                Explorar usuarios
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <GiCardBurn className="text-2xl sm:text-lg sm:mr-2" />
                Explorar cartas
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <FaRankingStar className="text-2xl sm:text-lg sm:mr-2" />
                Ranking de usuarios
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <FaMedal className="text-2xl sm:text-lg sm:mr-2" />
                Ranking de cartas
              </Link>
            </li>
            <li>
              <Link
                href="/mercado"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <BsCurrencyExchange className="text-2xl sm:text-lg sm:mr-2" />
                Mercado
              </Link>
            </li>
          </div>
          <div className="separate">
            <li>
              <Link
                href="/dashboard"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
               <UserIcon/>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <IoMdSettings className="text-2xl sm:text-lg mr-2 sm:mr-2" />{" "}
                Administrar cuenta
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`flex justify-center items-center text-white text-lg py-2 hover:opacity-75`}
                onClick={closeMenu}
              >
                <Logout />
              </Link>
            </li>
            <li>
              <IoCloseCircle
                size={30}
                className="close-button cursor-pointer hover:text-red-500"
                onClick={closeMenu}
              />
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

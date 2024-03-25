"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import Link from "next/link";
import "/public/css/profiles.css";

const UsersProfiles = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api-rest-card-quest.vercel.app/api/users/getAllUsers"
        );
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error al obtener datos de usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="relative w-2/5 mt-14 mb-7">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded bg-white text-black"
            placeholder="Buscar usuarios"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute left-0 top-0 px-4 py-2 rounded-l">
            <FiSearch size={25} />
          </button>
        </div>
      </div>

      <div className="content-users p-4 mt-4 mb-14">
        <div className="container mx-auto">
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
              {filteredUsers.slice(0, visibleUsers).map((user) => (
                <Link key={user._id} href={`/users/${user._id}`}>
                  <div
                    key={user._id}
                    className="bg-white h-60 cursor-pointer border border-slate-900 rounded-3xl shadow-md transition duration-300 transform hover:scale-105 relative"
                  >
                    <div className="relative h-32 mb-4">
                      <img
                        src={user.banner}
                        alt="Banner"
                        className="w-full h-full object-cover rounded-t-3xl"
                      />
                      <img
                        src={user.image}
                        alt="Foto de Perfil"
                        className="w-28 h-28 object-cover rounded-full absolute -bottom-5 left-14 transform -translate-x-1/2"
                      />
                      <div class="relative flex flex-col items-center">
                        <div class="absolute flex flex-col w-[38%] text-lg text-white font-semibold left-[62%] bottom-[1.5rem] text-center capitalize ">
                          <p class="userName ">{user.name}</p>
                        </div>
                        <div class="relative bottom-0 max-[640px]:left-[46%] sm:left-[45%] md:left-[44%] lg:left-[45%] xl:left-[47%] top-[-1rem] flex justify-center">
                          <FaDiamond class="w-7 h-7 text-white diamante" />
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <p className="text-[#555555] text-center">{user.bio}</p>
                      <div className="flex gap-0.5 justify-center">
                        <p className="text-[#555555] text-center ">
                          {" "}
                          Siguiendo: {user.following.length}
                        </p>
                        <img
                          src="assets/gema-form.png"
                          alt=""
                          className="h-6 pl-2"
                        />
                        <p className="">Seguidores: {user.followers.length}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersProfiles;

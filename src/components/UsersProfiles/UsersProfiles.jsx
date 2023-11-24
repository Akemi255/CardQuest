"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import Link from "next/link";

const UsersProfiles = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/users/getAllUsers"
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
    <div className="bg-slate-800 p-4 mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Lista de Usuarios
        </h1>

        <div className="flex items-center justify-center">
          <input
            type="text"
            className="w-1/2 px-4 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Buscar usuarios"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 rounded-r">
            <FiSearch size={25} />
          </button>
        </div>

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {filteredUsers.slice(0, visibleUsers).map((user) => (
              <Link key={user._id} href={`/users/${user._id}`}>
                <div
                  key={user._id}
                  className="bg-slate-700 cursor-pointer border border-slate-900 rounded-md shadow-md transition duration-300 transform hover:scale-105 relative"
                >
                  <div className="relative h-32 mb-4">
                    <img
                      src={user.banner}
                      alt="Banner"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <img
                      src={user.image}
                      alt="Foto de Perfil"
                      className="w-16 h-16 object-cover rounded-full absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                    />
                  </div>
                  <div className="py-1">
                    <p className="text-lg text-white font-semibold mt-8 text-center capitalize">
                      {user.name}
                    </p>
                    <p className="text-gray-500 text-center">
                      Siguiendo: {user.following.length} | Seguidores:{" "}
                      {user.followers.length}
                    </p>
                    <p className="text-white text-center">{user.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersProfiles;

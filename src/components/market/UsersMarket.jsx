"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, User } from "lucide-react";

const UsersMarket = () => {
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
      <div className="bg-[#171928] p-4 rounded-lg shadow-md">
        <div className="container mx-auto">
          {/* <h1 className="w-full text-center text-lg font-bold mb-2 text-white">
            Selecciona un usuario para iniciar el intercambio
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
          </div> */}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
              {filteredUsers.slice(0, visibleUsers).map((user) => (
                <Link key={user._id} href={`/mercado/${user._id}`}>
                  <div
                    key={user._id}
                    className="bg-black cursor-pointer border border-slate-900 rounded-md shadow-md transition duration-300 transform hover:scale-105 relative"
                  >
                    <div className="relative h-32 mb-4">
                      <img
                        src={user.banner}
                        alt="Banner"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Avatar className="w-20 h-20 object-cover border-[5px] border-black rounded-full absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                        <AvatarImage src={user.image} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {/* <img
                        src={user.image}
                        alt="Foto de Perfil"
                        className="w-16 h-16 object-cover rounded-full absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                      /> */}
                    </div>
                    <div className="flex flex-col justify-between p-4">
                      <p className="text-lg text-white font-semibold mt-8 text-center capitalize">
                        {user.name}
                      </p>
                      {/* <p className="text-gray-500 text-center">
                        Follower: {user.following.length} | Viewer:{" "}
                        {user.followers.length}
                      </p> */}
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-row gap-3 text-blue-400">
                          <User className="h-5 w-5" />
                          <span>1234</span>
                          {/* <span>Following</span> */}
                        </div>
                        <div className="flex flex-row gap-3 items-center text-pink-300">
                          <span>12313</span>
                          <Eye className="h-5 w-5" />
                        </div>
                      </div>

                      {/* <p className="text-white text-center">{user.bio}</p> */}
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

export default UsersMarket;

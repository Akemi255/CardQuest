"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Eye } from "lucide-react";
import { UserRound } from "lucide-react";

const UsersProfiles = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchNextPage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/users/getAllUsers/${currentPage + 1}`
      );
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al obtener datos de usuario:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3003/api/users/getAllUsers/1"
        );
        const data = await response.json();
        setUsers(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
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
          document.documentElement.offsetHeight - 100 &&
        currentPage < totalPages
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="content-users p-4 mb-14">
        <div className="container mx-auto">
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Link key={user._id} href={`/srachuser/${user._id}`}>
                  <div
                    key={user._id}
                    className="bg-black h-60 cursor-pointer border border-slate-900 rounded-3xl shadow-md transition duration-300 transform hover:scale-105 relative flex flex-col justify-center"
                  >
                    <div className="relative mb-4">
                      <Image
                        src={user.banner}
                        alt="Banner"
                        className="w-full h-32 object-cover rounded-t-3xl"
                        width={500}
                        height={500}
                      />
                      <div className=" absolute top-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Image
                          src={user.image}
                          alt="Foto de Perfil"
                          width={500}
                          height={500}
                          className="w-28 h-28 object-cover rounded-full"
                        />
                      </div>
                    </div>

                    <div className="py-1 mt-2 ">
                      <p className="text-white text-center relative top-[25px]">
                        {user.name}
                      </p>
                      <div className="flex justify-between mt-6">
                        <p className="lg:ml-3 md:ml-0 text-[#316686] font-bold flex items-center lg:text-sm  md:text-xs">
                          <UserRound
                            size={15}
                            className="relative bottom-[0.2px] "
                          />
                          {user.following.length} Following
                        </p>

                        <p className="lg:mr-3 md:mr-0 text-[#d973cc] font-bold flex items-center gap-2">
                          <Eye /> {user.followers.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {!loading && currentPage < totalPages && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={fetchNextPage}
          >
            Cargar más
          </button>
        </div>
      )}
    </>
  );
};

export default UsersProfiles;

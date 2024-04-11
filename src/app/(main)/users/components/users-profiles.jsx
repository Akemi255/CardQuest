"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";

import { Eye } from "lucide-react";
import { UserRound } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const UsersProfiles = () => {
  const router = useRouter();
  const { page } = useParams();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const maxPagesToShow = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/users/getAllUsers/${currentPage}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push(`/users/${newPage}`);
  };

  const renderPagination = (totalPages) => {
    const pageButtons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="bg-[#36017a] hover:bg-[#24064a] cursor-pointer from-gray-500 text-white"
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (startPage > 2) {
      pageButtons.push(
        <PaginationItem key="ellipsis_start">
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`pagination-button bg-[#36017a] text-white hover:bg-[#24064a] from-gray-500 cursor-pointer${
              currentPage === i ? "active-pagination-button bg-[#24064a] " : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (totalPages - endPage > 1) {
        pageButtons.push(
          <PaginationItem key="ellipsis_end">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }

      pageButtons.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="bg-[#36017a] text-white hover:bg-[#24064a] cursor-pointer from-gray-500"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageButtons;
  };

  // Redireccionamiento a notFound solo si la página no está dentro del rango válido
  if (parseInt(page) < 1 || page > parseInt(totalPages)) {
    return notFound();
  }

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
                        <p className="lg:ml-3 md:ml-0 text-[#316686] font-bold flex items-center lg:text-lg md:text-xs">
                          <UserRound
                            size={15}
                            className="relative bottom-[0.2px]"
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

      {!loading && totalPages > 1 && (
        <div className=" flex justify-center items-center flex-wrap">
          <Pagination className="relative bottom-7">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className="bg-[#36017a] hover:bg-[#24064a] cursor-pointer from-gray-500 text-white"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              {renderPagination(totalPages)}
              <PaginationItem>
                {currentPage < totalPages && (
                  <PaginationNext
                    className="bg-[#36017a] hover:bg-[#24064a] cursor-pointer from-gray-500 text-white"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default UsersProfiles;

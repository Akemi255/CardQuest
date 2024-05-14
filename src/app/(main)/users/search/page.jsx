"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import usePage from "@/hooks/usePage";

import { Eye, UserRound } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [currentPageNumber, setCurrentPageNumber] = useState(
    parseInt(search ? search.get("page") || "1" : "1", 10)
  );

  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxPagesToShow = 5;

  const reset = usePage((state) => state.reset);
  const setResetFalse = usePage((state) => state.setResetFalse);
  const [messageNotFound, setMessageNotFound] = useState(false);

  useEffect(() => {
    if (reset) {
      setCurrentPageNumber(1);
      setResetFalse();
    }
    const fetchData = async () => {
      if (!encodedSearchQuery) {
        router.push("/users/1");
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/users/searchUsers/${currentPageNumber}/${encodedSearchQuery}`
        );
        if (response.ok) {
          setMessageNotFound(false);
          const data = await response.json();
          setData(data.users);
          setTotalPages(data.totalPages);
        } else if (response.status === 404) {
          setMessageNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetchData();
      }, 10);
    };

    fetchDataWithDelay();
  }, [currentPageNumber, encodedSearchQuery, router]);

  const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
    router.push(`/users/search?q=${searchQuery}&page=${newPage}`);
  };

  const renderPagination = () => {
    const pageButtons = [];

    let startPage = Math.max(
      1,
      currentPageNumber - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="bg-[#36017a] hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500 text-white"
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
          <PaginationEllipsis className="text-white" />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`pagination-button bg-[#36017a] text-white hover:bg-[#24064a] hover:text-white from-gray-500 cursor-pointer${
              currentPageNumber === i
                ? "active-pagination-button bg-[#24064a] "
                : ""
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
            <PaginationEllipsis className="text-white" />
          </PaginationItem>
        );
      }

      pageButtons.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="bg-[#36017a] text-white hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageButtons;
  };

  //en caso de error en paginas en url volver al inicio
  if (
    parseInt(currentPageNumber) <= 0 ||
    parseInt(currentPageNumber) > parseInt(totalPages)
  ) {
    setCurrentPageNumber(1);
    router.push(`/users/search?q=${encodedSearchQuery}&page=1`);
  }

  return (
    <>
      {messageNotFound && !loading && (
        <h1 className="flex justify-center items-center mt-6 text-2xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300">
          Not Results for {searchQuery}
        </h1>
      )}
      <div>
        <div className="content-users p-4 mb-14">
          <div className="mx-auto">
            {!loading && !messageNotFound && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {data.map((user) => (
                  <Link key={user._id} href={`/users/user/${user._id}`}>
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

        {!loading && totalPages > 1 && !messageNotFound && (
          <div className="flex justify-center items-center flex-wrap">
            <Pagination className="relative bottom-7">
              <PaginationContent>
                {currentPageNumber > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="bg-[#36017a] hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500 text-white"
                      onClick={() => handlePageChange(currentPageNumber - 1)}
                    />
                  </PaginationItem>
                )}
                {renderPagination()}
                <PaginationItem>
                  {currentPageNumber < totalPages && (
                    <PaginationNext
                      className="bg-[#36017a] hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500 text-white"
                      onClick={() => handlePageChange(currentPageNumber + 1)}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default page;

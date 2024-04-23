"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { ClipLoader } from "react-spinners";

import RenderExploreCards from "../[page]/components/RenderExploreCards";
import { SearchInput } from "../components/SearchInput";
import { SetEmail } from "@/helpers/SetEmail";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const Page = () => {
  const router = useRouter();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const pageNumber = search ? search.get("page") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  if (searchQuery == "") {
    router.push("/explore/1");
  }
  let email = SetEmail();
  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { data, error, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/apicards/searchCards/${email}/${currentPageNumber}/${encodedSearchQuery}`
      : null,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  if (error) {
    return (
      <h1 className="flex justify-center items-center mt-6 text-2xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300">
        Not Results for {searchQuery}
      </h1>
    );
  }

  const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
    router.push(`/explore/search?q=${encodedSearchQuery}&page=${newPage}`);
  };

  const handleNewSearch = () => {
    setCurrentPageNumber(1);
  };

  const renderPagination = () => {
    const pageButtons = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(
      1,
      currentPageNumber - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(
      data.totalPages || 0,
      startPage + maxPagesToShow - 1
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      endPage = Math.min(data.totalPages || 0, startPage + maxPagesToShow - 1);
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={`${
              1 === currentPageNumber
                ? "bg-[#24064a] text-white cursor-pointer"
                : "bg-[#36017a] text-white hover:bg-[#24064a] cursor-pointer"
            }`}
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
            className={`${
              i === currentPageNumber
                ? "bg-[#24064a] text-white cursor-pointer"
                : "bg-[#36017a] text-white hover:bg-[#24064a] cursor-pointer"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < (data.totalPages || 0)) {
      if ((data.totalPages || 0) - endPage > 1) {
        pageButtons.push(
          <PaginationItem key="ellipsis_end">
            <PaginationEllipsis className="text-white" />
          </PaginationItem>
        );
      }

      pageButtons.push(
        <PaginationItem key={data.totalPages || 0}>
          <PaginationLink
            className={`${
              (data.totalPages || 0) === currentPageNumber
                ? "bg-[#24064a] text-white cursor-pointer"
                : "bg-[#36017a] text-white hover:bg-[#24064a] cursor-pointer"
            }`}
            onClick={() => handlePageChange(data.totalPages || 0)}
          >
            {data.totalPages || 0}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageButtons;
  };

  const renderNavigationButtons = () => {
    return (
      <Pagination className="relative bottom-7">
        <PaginationContent>
          {currentPageNumber > 1 && (
            <PaginationPrevious
              onClick={() => handlePageChange(currentPageNumber - 1)}
              className="bg-[#36017a] hover:bg-[#24064a] cursor-pointer from-gray-500 text-white"
            />
          )}
          {renderPagination()}
          {currentPageNumber < (data.totalPages || 0) && (
            <PaginationNext
              onClick={() => handlePageChange(currentPageNumber + 1)}
              className="bg-[#36017a] hover:bg-[#24064a] cursor-pointer from-gray-500 text-white"
            />
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  if (parseInt(pageNumber) < 1 || pageNumber > parseInt(data?.totalPages)) {
    return notFound();
  }

  return (
    <div>
      <SearchInput onNewSearch={handleNewSearch} className="mt-4" />

      {data && (
        <>
          {/* Renderizar datos */}
          <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
            {data.cards.map((item, index) => (
              <RenderExploreCards key={index} index={index} character={item} />
            ))}
          </div>

          {/* Renderizar controles de paginación */}
          <div className="mt-4 flex justify-center items-center flex-wrap">
            <Pagination>{renderNavigationButtons()}</Pagination>
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default Page;

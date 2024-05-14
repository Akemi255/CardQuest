"use client";
import useSWR from "swr";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

import RenderExploreCards from "./components/RenderExploreCards";
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
import { SearchInput } from "../components/SearchInput";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Page() {
  const router = useRouter();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  let email = SetEmail();
  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { data, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/apiCards/exploredCards/${currentPage}?email=${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
  }, [page]);

  const maxPagesToShow = 5;

  const handlePageChange = (newPage) => {
    router.push(`/explore/${newPage}`);
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-[200px] overflow-hidden">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    );

  if (parseInt(page) < 1 || currentPage > parseInt(data?.totalPages)) {
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <SearchInput className="mt-4" />

        <div className="flex flex-wrap gap-[20px] justify-center mt-7 mb-[50px]">
          {data?.cards?.map((card, index) => (
            <RenderExploreCards
              key={index}
              index={index}
              character={card}
              email={email}
            />
          ))}
        </div>
      </div>

      {!isLoading && data?.totalPages > 1 && (
        <div className=" flex justify-center items-center flex-wrap">
          <Pagination className="relative bottom-7">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className="bg-[#36017a] hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500 text-white"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              {renderPagination(data.totalPages)}
              <PaginationItem>
                {currentPage < data.totalPages && (
                  <PaginationNext
                    className="bg-[#36017a] hover:bg-[#24064a] hover:text-white cursor-pointer from-gray-500 text-white"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

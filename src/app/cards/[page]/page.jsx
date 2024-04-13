"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/footer";
import { useParams } from "next/navigation";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { getEmail } from "@/helpers/getEmail";
import { RenderExploreCards } from "@/components/explore-cards/render-explore-cards";
import SearchInput from "@/components/explore-cards/buscador";

const Page = () => {
  const email = getEmail();
  const { page } = useParams();
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(
    parseInt(page, 10) || 1
  );
  const [totalPages, setTotalPages] = useState(4250);

  // Obtención de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/apiCards/exploredCards/${currentPageNumber}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        if (response.ok) {
          const jsonData = await response.json();
          setTotalPages(jsonData.totalPages);
          if (Array.isArray(jsonData.cards)) {
            setData(jsonData.cards);
          } else {
            console.error('Error fetching data: "cards" is not an array');
          }
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPageNumber, email]);

  // Función para cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
    updateUrl(newPage);
  };

  // Actualización de URL
  const updateUrl = (newPage) => {
    window.history.pushState({}, "", `/cards-ranking/${newPage}`);
  };

  // Renderizar botones de paginación
  const renderPagination = (totalPages) => {
    const pageButtons = [];
    const maxPagesToShow = 5;

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
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mr-2 rounded-lg transition-colors duration-300 ${
            1 === currentPageNumber
              ? "bg-blue-400 text-white font-semibold"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          1
        </button>
      );
    }

    if (startPage > 2) {
      pageButtons.push(
        <span key="ellipsis_start" className="px-3 py-1 mr-2 text-white">
          ...
        </span>
      );
    }

    // Renderizar botones de página en el medio
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mr-2 rounded-lg transition-colors duration-300 ${
            i === currentPageNumber
              ? "bg-blue-400 text-white font-semibold"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (totalPages - endPage > 1) {
        pageButtons.push(
          <span key="ellipsis_end" className="px-3 py-1 mr-2 text-white">
            ...
          </span>
        );
      }

      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mr-2 rounded-lg transition-colors duration-300 ${
            totalPages === currentPageNumber
              ? "bg-blue-400 text-white font-semibold"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex items-center justify-center flex-wrap">
        {currentPageNumber !== 1 && (
          <button
            onClick={() => handlePageChange(currentPageNumber - 1)}
            className="flex items-center flex-wrap"
          >
            <MdNavigateBefore
              className="bg-slate-700 mr-2 rounded-lg transition-colors duration-300"
              size={32}
              color="white"
            />
          </button>
        )}
        {renderPagination(totalPages)}
        {currentPageNumber !== totalPages && (
          <button
            onClick={() => handlePageChange(currentPageNumber + 1)}
            className="flex items-center flex-wrap"
          >
            <MdNavigateNext
              className="bg-slate-700 mr-2 rounded-lg transition-colors duration-300"
              size={32}
              color="white"
            />
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <br />
      <SearchInput />
      {/* Renderizar datos */}
      <div className="flex flex-wrap mt-5">
        {data.map((item, index) => (
          <RenderExploreCards key={item._id} data={item} index={index} />
        ))}
      </div>

      {/* Renderizar controles de paginación */}
      <div className="mt-4 flex justify-center items-center flex-wrap">
        {renderNavigationButtons()}
      </div>

      <br />

      <Footer />
    </>
  );
};

export default Page;

"use client"
import { getEmail } from '@/helpers/getEmail';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import SearchInput from '@/components/explore-cards/buscador';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/footer';
import { RenderExploreCards } from '@/components/explore-cards/render-explore-cards';


const Page = () => {
  const email = getEmail();
  const router = useRouter();
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [currentPageNumber, setCurrentPageNumber] = useState(
    parseInt(search ? search.get("page") || "1" : "1", 10)
  );
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-rest-card-quest.vercel.app/api/apicards/searchCards/${currentPageNumber}/${encodedSearchQuery}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const jsonData = await response.json();
          setTotalPages(jsonData.totalPages);
          setData(jsonData.data); // Assuming your API response has a 'data' field containing the actual data
          console.log('Petición POST exitosa');
          if (Array.isArray(jsonData.cards)) {
            setData(jsonData.cards);
          } else {
            console.error('Error fetching data: "cards" is not an array');
          }
        } else {
          console.error('Error en la petición POST:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la petición POST:', error);
      }
    };

    fetchData();
  }, [email, encodedSearchQuery, currentPageNumber]);

  const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
    updateUrl(newPage);
  };

  const updateUrl = (newPage) => {
    router.push(`/cards/1/search?q=${encodedSearchQuery}&page=${newPage}`);
  };

  const handleNewSearch = () => {
    // Resetear currentPageNumber a 1 en cada nueva búsqueda
    setCurrentPageNumber(1);
  };

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
      <SearchInput onNewSearch={handleNewSearch}/>
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
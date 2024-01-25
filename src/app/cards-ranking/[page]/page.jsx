"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/footer';
import { useParams } from 'next/navigation';

const Page = () => {
  const { page } = useParams();

  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  //obteniendo datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/apiCards/sortedByCoins/${currentPageNumber}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentPageNumber) {
      fetchData();
    }
  }, [currentPageNumber]);
  //fin de obtención de datos

  //funcion para cambio de pagina
  const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
 
    window.location.href = `/cards-ranking/${newPage}`;
  };
 



  const renderPagination = () => {
    const totalPages = 10; // Reemplaza esto con el número total real de páginas de tu API.

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ fontWeight: i === currentPageNumber ? 'bold' : 'normal' }}
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <>
      <Header />

      {/* Render your data here */}
      {data.map((item) => (
        <div key={item._id}>
          {/* Render individual data items */}
          <h3>{item.name}</h3>
          {/* Add more fields as needed */}
        </div>
      ))}

      {/* Render pagination controls */}
      <div style={{ marginTop: '20px' }}>{renderPagination()}</div>

      <br />
      <Footer />
    </>
  );
};

export default Page;

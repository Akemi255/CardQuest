import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { ProfileSavedCards } from "./ProfileSavedCards";
import { sampleCards } from "@/helpers/samplecards";
import Footer from "../Layout/footer";

const SavedCardsSection = () => {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/cards/findUserCards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "gus1465@aol.com",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al realizar la petición");
        }

        const data = await response.json();
        console.log("Datos del usuario:", data);
        setUserCards(data); // Almacena los datos en el estado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md">
      <div className="flex items-center justify-between mx-auto">
        <h2 className="ml-2 text-2xl font-bold text-white hover:text-gray-300 relative transition duration-300 ease-in-out cursor-pointer">
          Cartas guardadas
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-l bg-gray-800 text-white"
            placeholder="Buscar cartas..."
          />
          <button className="px-4 py-2 rounded-r">
            <FiSearch size={25} />
          </button>
        </div>
        <h2 className="flex items-center mr-2 text-2xl font-bold text-white cursor-pointer hover:text-gray-300 relative transition duration-300 ease-in-out">
          Borrar cartas <BiSolidTrashAlt size={32} color="red" />
        </h2>
      </div>
      <div className="flex flex-wrap mt-5 ">
        {/* Integrar las cartas de muestra */}
        {userCards.map((card, index) => (
          <ProfileSavedCards
            key={index}
            character={card.content}
            index={index}
          />
        ))}
      </div>
    </div>
    
    </>
  );
};

export default SavedCardsSection;

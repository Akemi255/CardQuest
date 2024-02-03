"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa6";

const TopCards = () => {
  const [topCards, setTopCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCards = async () => {
      try {
        const response = await fetch(
          "https://api-rest-card-quest.vercel.app/api/apiCards/getTopCards"
        );

        if (!response.ok) {
          throw new Error("Error al obtener las mejores cartas");
        }

        const data = await response.json();

        // Intercambiar el orden de la primera y segunda carta
        if (data.length >= 2) {
          const firstCard = data[0];
          data[0] = data[1];
          data[1] = firstCard;
        }

        setTopCards(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener las mejores cartas");
      }
    };

    fetchTopCards();
  }, []);

  const getColorForRarity = (rareza) => {
    const lowerCasedRareza = (rareza || "").toLowerCase();

    switch (lowerCasedRareza) {
      case "comun":
        return "border-red-800";
      case "plata":
        return "border-gray-300";
      case "oro":
        return "border-yellow-500";
      case "raro":
        return "border-green-500";
      case "epico":
        return "border-indigo-600";
      case "mitico":
        return "border-pink-500";
      default:
        return "border-blue-500";
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center text-2xl font-bold text-white relative top-5 bg-gray-700">
        <p>Cartas mejor valoradas</p>
      </h1>
      <div className="flex flex-wrap justify-center w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md">
        
        {error && <p>{error}</p>}
        {topCards.map((card, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 relative"
          >
            <CardItem
              card={card}
              getColorForRarity={getColorForRarity}
              index={index}
            />
          </div>
        ))}
      </div>
      <button className="mx-auto mt-3 flex justify-center items-center bg-slate-600 px-4 py-2 text-white rounded-md hover:bg-slate-800 text-2xl font-bold  cursor-pointer transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0">
      <Link href="/cards-ranking/1">Ver todo el ranking</Link> 
    </button>
      
    </>
  );
};

const CardItem = ({ card, getColorForRarity, index }) => {
  let medalColor;
  
  if (index === 0) {
    medalColor = "silver";
  } else if (index === 1) {
    medalColor = "gold";
  } else {
    medalColor = "#8B4513";
  }

  return (
    <div
      className={`relative ${getColorForRarity(
        card.rareza
      )} border-mitico bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:shadow-xl hover:scale-105 w-82 h-full`}
    >
      <FaMedal color={medalColor} size={40} className="absolute top-2 left-2 z-20" />

      {card.images && card.images.jpg && (
        <img
          src={card.images.jpg.image_url}
          alt={card.name}
          className="w-full h-48 sm:h-64 object-cover hover:shadow-lg relative z-10"
        />
      )}

      <div className="p-4 text-center relative z-20">
        <h3 className="text-xl font-bold">{card.name}</h3>
        {card.anime && card.anime[0] && <p>Anime: {card.anime[0].anime.title}</p>}
        <p className="flex items-center justify-center mt-2">
          <span
            className={`w-1/4 border-b-2 ${getColorForRarity(card.rareza)}`}
          ></span>
          <span className="mx-2">{card.rareza}</span>
          <span
            className={`w-1/4 border-b-2 ${getColorForRarity(card.rareza)}`}
          ></span>
        </p>
        <p> Monedas: {card?.monedas}</p>
      </div>
    </div>
  );
};


export default TopCards;

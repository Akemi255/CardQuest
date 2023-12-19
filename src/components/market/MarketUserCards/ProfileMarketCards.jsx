import React, { useState } from "react";

export const ProfileMarketCards = ({
  character,
  id,
  onCardAddedToTrade,
  isSelected,
  setSelectedCards,
}) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  const handleToggleTradeStatus = () => {
    onCardAddedToTrade(id);
    setIsCardSelected((prevIsSelected) => !prevIsSelected);
  };

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
    <div
      key={id}
      className="flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className={`${character.borderColorClass} border-animado bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer h-full flex flex-col justify-center items-center`}
        >
          {character.images && character.images.jpg && (
            <img
              src={character.images.jpg.image_url}
              alt={character.name}
              className="w-full h-48 sm:h-64 object-cover hover:shadow-lg"
            />
          )}

          <div className="p-4 text-center">
            <h3 className="text-lg sm:text-xl font-bold">{character.name}</h3>
            {character.anime && character.anime[0] && (
              <p>Anime: {character.anime[0].anime.title}</p>
            )}
            <p className="flex items-center justify-center mt-2">
              <span
                className={`w-1/4 border-b-2 ${getColorForRarity(
                  character.rareza
                )}`}
              ></span>

              <span className="mx-2">{character.rareza}</span>
              <span
                className={`w-1/4 border-b-2 ${getColorForRarity(
                  character.rareza
                )}`}
              ></span>
            </p>
            <button
              onClick={handleToggleTradeStatus}
              className={`mt-2 ${
                isCardSelected
                  ? "bg-red-500 text-white hover:bg-red-700"
                  : "bg-slate-600 text-white hover:bg-slate-800"
              } rounded-md focus:outline-none`}
              style={{ height: isCardSelected ? "45px" : "45px" }}
            >
              {isCardSelected
                ? "Eliminar de intercambio"
                : "Agregar carta a intercambio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

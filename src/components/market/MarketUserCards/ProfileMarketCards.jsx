import { useState } from "react";
import "/public/css/home.css";

import Image from "next/image";

import comunCoin from "../../../../public/assets/coins/comun-coin.png";
import raroCoin from "../../../../public/assets/coins/raro-coin.png";
import oroCoin from "../../../../public/assets/coins/oro-coin.png";
import plataCoin from "../../../../public/assets/coins/plata-coin.png";
import epicoCoin from "../../../../public/assets/coins/epico-coin.png";
import miticoCoin from "../../../../public/assets/coins/mitico-coin.png";

import { Button } from "@/components/ui/button";

export const ProfileMarketCards = ({
  character,
  id,
  onCardAddedToTrade,
  isSelected,
  index,
}) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  const handleToggleTradeStatus = () => {
    onCardAddedToTrade(id);
    setIsCardSelected((prevIsSelected) => !prevIsSelected);
  };

  const imgCoins = (params) => {
    switch (params) {
      case "border-comun":
        return comunCoin;
      case "border-raro":
        return raroCoin;
      case "border-oro":
        return oroCoin;
      case "border-plata":
        return plataCoin;
      case "border-epic":
        return epicoCoin;
      case "border-mitic":
        return miticoCoin;
      default:
        return miticoCoin;
    }
  };

  return (
    <div>
      <div
        key={index}
        className={`flex relative ${isCardSelected ? "opacity-50" : ""}`}
      >
        <div
          className={`${character.borderColorClass} flex flex-col justify-start cartas items-center `}
        >
          <Image
            src={`/assets/${character.borderColorClass}.png`}
            alt="border"
            className="borderGeneral flex items-center"
            width={500}
            height={500}
            priority={false}
          />

          {character.images && character.images.jpg && (
            <Image
              src={character.images.jpg.image_url}
              alt={character.name}
              width={500}
              height={500}
              priority={false}
              className="w-full h-48 sm:h-64 object-cover hover:shadow-lg mx-auto imagenAnime"
            />
          )}

          <div className="info-like relative">
            <div className="text-center mt-[5px] personaje-anime">
              <p className="text-[11px] font-bold">{character.name}</p>
              {character.anime && character.anime[0] && (
                <p className="text-[9px]">{character.anime[0].anime.title}</p>
              )}
            </div>

            <div className="flex flex-row gap-1 items-center">
              <span className="font-medium">{character.monedas}</span>

              <Image
                src={imgCoins(character.borderColorClass)}
                width={24}
                height={24}
                alt="coin"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Button
          onClick={handleToggleTradeStatus}
          className={`mb-2 ${
            isCardSelected
              ? "bg-red-500 text-white hover:bg-red-700"
              : "bg-[#43B581] text-white hover:bg-[#348b64]"
          } rounded-md focus:outline-none px-4 py-2 relative bottom-2`}
          style={{ height: isCardSelected ? "45px" : "45px" }}
        >
          {isCardSelected ? "Eliminate from trade" : "Add card to trade"}
        </Button>
      </div>
    </div>
  );
};

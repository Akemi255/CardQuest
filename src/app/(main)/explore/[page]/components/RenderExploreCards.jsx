import { Heart, HeartOff } from "lucide-react";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "/public/css/home.css";

import comunCoin from "../../../../../../public/assets/coins/comun-coin.png";
import raroCoin from "../../../../../../public/assets/coins/raro-coin.png";
import oroCoin from "../../../../../../public/assets/coins/oro-coin.png";
import plataCoin from "../../../../../../public/assets/coins/plata-coin.png";
import epicoCoin from "../../../../../../public/assets/coins/epico-coin.png";
import miticoCoin from "../../../../../../public/assets/coins/mitico-coin.png";

const RenderExploreCards = ({ character, index, email }) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (character?.favoritedBy?.includes(email)) {
      setIsFilled(true);
    }
  }, [character, email]);

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

  const borderClass = (params) => {
    switch (params) {
      case "comun":
        return "border-comun";
      case "raro":
        return "border-raro";
      case "oro":
        return "border-oro";
      case "plata":
        return "border-plata";
      case "epico":
        return "border-epico";
      case "mitico":
        return "border-mitico";
      default:
        return "border-comun";
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/apiCards/addCardToFavorites/${character._id}/${email}`,
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        setIsFilled(!isFilled);
        toast.success("Card liked successfully");
      }

      if (response.status === 202) {
        setIsFilled(!isFilled);
        toast.success("This Card has been removed from your favorites");
      }
    } catch (error) {
      console.error("Error al guardar la carta:", error);
    }
  };

  const grayscaleClass = character?.blanco_negro ? "" : "grayscale";

  return (
    <div key={index} className={`flex relative ${grayscaleClass}`}>
      <div
        className={`${borderClass(
          character?.rareza
        )} flex flex-col justify-start cartas items-center`}
      >
        <Image
          src={`/assets/${borderClass(character?.rareza)}.png`}
          alt="border"
          width={500}
          height={500}
          priority={false}
          className="borderGeneral flex items-center"
        />

        {character?.images && character?.images.jpg && (
          <Image
            src={character?.images.jpg.image_url}
            alt={character?.name}
            width={500}
            height={500}
            priority={false}
            className={`w-full h-48 sm:h-64 object-cover hover:shadow-lg mx-auto imagenAnime ${grayscaleClass}`}
          />
        )}

        <div className={`info-like relative ${grayscaleClass}`}>
          <div className="text-center mt-[5px] personaje-anime">
            <p className="text-[11px] font-bold">{character?.name}</p>
            {character?.anime && character?.anime[0] && (
              <p className="text-[9px]">{character?.anime[0].anime.title}</p>
            )}
          </div>

          <div className="flex flex-row gap-1 items-center">
            <span className="font-medium">{character?.monedas}</span>

            <Image
              src={imgCoins(borderClass(character?.rareza))}
              width={24}
              height={24}
              alt="coin"
              priority={false}
            />
          </div>
        </div>
        <Heart
          onClick={handleLikeClick}
          size={33}
          className={`z-10 rounded-full bg-red-500 cursor-pointer absolute bottom-[30px] right-7 p-2 hover:bg-red-600 scale-75 md:scale-100 -mb-2 md:mb-1  -mr-4 md:mr-0  ${
            isFilled ? "fill-red-500" : "stroke-current text-white"
          }`}
        />
      </div>
    </div>
  );
};

export default RenderExploreCards;

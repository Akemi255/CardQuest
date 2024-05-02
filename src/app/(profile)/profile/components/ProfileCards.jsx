import { Trash } from "lucide-react";
import "/public/css/home.css";

import Image from "next/image";

import comunCoin from "../../../../../public/assets/coins/comun-coin.png";
import raroCoin from "../../../../../public/assets/coins/raro-coin.png";
import oroCoin from "../../../../../public/assets/coins/oro-coin.png";
import plataCoin from "../../../../../public/assets/coins/plata-coin.png";
import epicoCoin from "../../../../../public/assets/coins/epico-coin.png";
import miticoCoin from "../../../../../public/assets/coins/mitico-coin.png";
import { toast } from "react-toastify";
import { SetEmail } from "@/helpers/SetEmail";

const ProfileCards = ({ character, index }) => {
  const email = SetEmail();

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

  const handleDeleteCard = async () => {
    try {
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/cards/deleteIndividualCard/${character.mal_id}/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast("Card deleted successfully");
      }
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div key={index} className="flex relative">
      <div
        className={`${character.borderColorClass} flex flex-col justify-start cartas items-center `}
      >
        <Trash
          onClick={handleDeleteCard}
          size={30}
          className="z-10 cursor-pointer absolute bottom-[30px] right-5 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        />

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
  );
};

export default ProfileCards;

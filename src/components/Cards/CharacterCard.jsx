import { AiFillLike } from "react-icons/ai";
import "/public/css/home.css";

import Image from "next/image";

import comunCoin from "../../../public/assets/coins/comun-coin.png";
import raroCoin from "../../../public/assets/coins/raro-coin.png";
import oroCoin from "../../../public/assets/coins/oro-coin.png";
import plataCoin from "../../../public/assets/coins/plata-coin.png";
import epicoCoin from "../../../public/assets/coins/epico-coin.png";
import miticoCoin from "../../../public/assets/coins/mitico-coin.png";

const CharacterCard = ({
  character,
  index,
  getColorForRarity,
  saveCharacter,
  existingCards,
  loading,
}) => {
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
    <div key={index} className="flex relative">
      <div
        className={`${character.borderColorClass} flex flex-col justify-start cartas items-center `}
      >
        <Image
          src={`/assets/${character.borderColorClass}.png`}
          alt="border"
          className="borderGeneral flex items-center"
          width={500}
          height={500}
        />

        {character.images && character.images.jpg && (
          <Image
            src={character.images.jpg.image_url}
            alt={character.name}
            width={500}
            height={500}
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
            />
          </div>

          {character.saved ? (
            <button
              className="absolute bottom-0 boton-guardar self-end rounded-full text-white cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              <AiFillLike />
            </button>
          ) : (
            <button
              className="absolute bottom-0 boton-guardar self-end text-white rounded-full flex items-center justify-center"
              onClick={() => saveCharacter(character, index)}
              disabled={loading}
            >
              <img src="/assets/corazon.png" alt="corazon" />
            </button>
          )}

          {/* {existingCards[index] && (
            <div
              className={`text-xs relative top-5 ${
                existingCards[index] ? "bg-green-400 " : "bg-blue-500"
              } text-white py-1 px-2 rounded flex items-center justify-center`}
              disabled={loading}
            >
              {existingCards[index]
                ? `Esta carta ya la tienes`
                : "Guardar en el perfil"}
            </div>
          )} */}
          {/* {true && (
            <div
              className={`text-xs relative top-5 ${
                true ? "bg-green-400 " : "bg-blue-500"
              } text-white py-1 px-2 rounded flex items-center justify-center`}
            >
              {true ? `Esta carta ya la tienes` : "Guardar en el perfil"}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

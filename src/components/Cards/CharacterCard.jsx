import { AiFillLike } from "react-icons/ai";
import "/public/css/home.css";

import { IconButtons } from "./IconButton";
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
  const imgCoins = {
    comun: comunCoin,
    raro: raroCoin,
    oro: oroCoin,
    plata: plataCoin,
    epic: epicoCoin,
    mitic: miticoCoin,
  };

  return (
    <div key={index} className="flex relative">
      <div
        className={`${character.borderColorClass} flex flex-col justify-start cartas items-center `}
      >
        <Image
          src={`/assets/${character.borderColorClass}.png`}
          alt=""
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
            {<IconButtons.sparkle />}
            {/* <Image src={imgCoins.key("comun")} /> */}
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

          {existingCards[index] && (
            <button
              className={`text-xs ${
                existingCards[index]
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white py-1 px-2 rounded flex items-center justify-center ${
                loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
              onClick={() => saveCharacter(character, index)}
              disabled={loading}
            >
              {existingCards[index]
                ? `Esta carta ya la tienes`
                : "Guardar en el perfil"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

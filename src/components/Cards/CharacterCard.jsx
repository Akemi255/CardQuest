import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const CharacterCard = ({
  character,
  index,
  getColorForRarity,
  saveCharacter,
  existingCards,
}) => {
  return (
    <div
      key={index}
      className="flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 relative"
    >
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
          <h3 className="text-xl font-bold">{character.name}</h3>
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
          <p> Monedas: {character.monedas}</p>
          {character.saved ? (
            <button
              className="mt-2 bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed flex items-center justify-center"
              disabled
            >
              Guardado en el perfil <AiFillLike className="ml-1" />
            </button>
          ) : (
            <button
              className={`mt-2 ${
                existingCards[index]
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white py-2 px-4 rounded flex items-center justify-center`}
              onClick={() => saveCharacter(character, index)}
            >
              {existingCards[index]
                ? `Guardar por ${character.monedas} monedas`
                : "Guardar en el perfil"}{" "}
              <AiOutlineLike className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

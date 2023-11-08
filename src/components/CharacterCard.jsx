import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const CharacterCard = ({ character, index, getColorForRarity, saveCharacter }) => {
  return (
    <div key={index} className="w-1/5 p-4">
      <div
        className={`${character.borderColorClass} border-animado bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer h-full`}
        style={{ minWidth: '200px' }} // Establecer un ancho mínimo para todas las cartas
      >
        {character.images && character.images.jpg && (
          <img
            src={character.images.jpg.image_url}
            alt={character.name}
            className="w-full h-50 object-cover hover:shadow-lg" // Establecer una altura específica y 'object-cover' para ajustar la imagen al contenedor
          />
        )}

        <div className="p-4 h-full">
          <h3 className="text-xl font-bold">{character.name}</h3>
          {character.anime && character.anime[0] && (
            <p>Anime: {character.anime[0].anime.title}</p>
          )}
          <p className="flex items-center">
            <span
              className={`w-full border-b-2 ${getColorForRarity(character.rareza)}`}
            ></span>
            <span className="mx-2">{character.rareza}</span>
            <span
              className={`w-full border-b-2 ${getColorForRarity(character.rareza)}`}
            ></span>
          </p>
          {character.saved ? (
            <button
              className="mt-2 bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Guardado en el perfil{' '}
              <AiFillLike className="inline-block mb-1" />
            </button>
          ) : (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => saveCharacter(character, index)}
            >
              Guardar en el perfil{' '}
              <AiOutlineLike className="inline-block mb-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

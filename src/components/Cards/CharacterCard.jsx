
import { AiFillLike } from "react-icons/ai";
import '/public/css/home.css';

const CharacterCard = ({
  character,
  index,
  getColorForRarity,
  saveCharacter,
  existingCards,
  loading
}) => {
  return (
    <div key={index} className="flex">
      <div className={`${character.borderColorClass} cartas  flex items-center`}>
        <img 
          src={`/assets/${character.borderColorClass}.png`}
          alt="" 
          className="borderComun flex items-center"
        />
        {character.images && character.images.jpg && (
          <img
            src={character.images.jpg.image_url}
            alt={character.name}
            className="w-full h-48 sm:h-64 object-cover hover:shadow-lg mx-auto imagenAnime"
          />
        )}
        <div className="info-like">
          <div className="text-center personaje-anime">
            <p className="name font-bold">{character.name}</p>
            {character.anime && character.anime[0] && (
              <p className="name-anime">{character.anime[0].anime.title}</p>
            )}
          </div>
          {character.saved ? (
            <button
              className="boton-guardar text-white py-2 px-4 rounded cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              <AiFillLike />
            </button>
          ) : (
            <button
              className="boton-guardar text-white py-2 px-4 rounded flex items-center justify-center"
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
                  ? 'bg-green-400 hover:bg-green-500'
                  : 'bg-blue-500 hover:bg-blue-700'
              } text-white py-1 px-2 rounded flex items-center justify-center ${
                loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              onClick={() => saveCharacter(character, index)}
              disabled={loading}
            >
              {existingCards[index]
                ? `Esta carta ya la tienes`
                : 'Guardar en el perfil'}{' '}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

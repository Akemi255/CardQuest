import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import '/public/css/home.css';

const CharacterCard = ({
  character,
  index,
  getColorForRarity,
  saveCharacter,
  existingCards,
}) => {
  
  console.log(existingCards); 
  return (
<div key={index} className="flex">
  <div className={`${character.borderColorClass} cartas  flex items-center`}>
    <img 
    src={`/assets/${character.borderColorClass}.png`}
    alt="" 
    className="borderComun flex items-center"/>
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
            disabled
          >
            <AiFillLike />
          </button>
        ) : (
          <button
            className="boton-guardar text-white py-2 px-4 rounded flex items-center justify-center"
            onClick={() => saveCharacter(character, index)}
          >
            <img src="/assets/corazon.png" alt="corazon" />
          </button>
        )}
    </div>
  </div>
</div>
  );
};

export default CharacterCard;

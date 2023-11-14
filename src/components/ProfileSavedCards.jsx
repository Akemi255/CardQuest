

export const ProfileSavedCards = ({ character, index }) => {
  // Definición local de getColorForRarity
  const getColorForRarity = (rareza) => {
    // Verifica si rareza es undefined o nulo antes de llamar a toLowerCase
    const lowerCasedRareza = (rareza || '').toLowerCase();
  
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
    <div key={index} className="w-1/5 p-4">
      <div
        className={`${character.borderColorClass} border-animado bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer h-full`}
        style={{ minWidth: "200px" }}
      >
        {character.images && character.images.jpg && (
          <img
            src={character.images.jpg.image_url}
            alt={character.name}
            className="w-full h-50 object-cover hover:shadow-lg"
          />
        )}

        <div className="p-4 h-full">
          <h3 className="text-xl font-bold">{character.name}</h3>
          {character.anime && character.anime[0] && (
            <p>Anime: {character.anime[0].anime.title}</p>
          )}
          <p className="flex items-center">
            <span
              className={`w-full border-b-2 ${getColorForRarity(
                character.rareza
              )}`}
            ></span>
            <span className="mx-2">{character.rareza}</span>
            <span
              className={`w-full border-b-2 ${getColorForRarity(
                character.rareza
              )}`}
            ></span>
          </p>
          {/* Otros detalles de la carta */}
        </div>
      </div>
    </div>
  );
};

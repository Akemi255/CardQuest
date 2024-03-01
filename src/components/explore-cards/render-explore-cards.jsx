export const RenderExploreCards = ({ data, index }) => {
    const getColorForRarity = (rareza) => {
      const lowerCasedRareza = (rareza || "").toLowerCase();
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
  
    const borderColorClass = getColorForRarity(data.rareza);
  
    // Aplica el filtro de escala de grises si blanco_negro es false
    const grayscaleClass = data.blanco_negro ? '' : 'filter grayscale';
  
    return (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <div
          className={`${borderColorClass} ${grayscaleClass} border-animado bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer h-full flex flex-col justify-center items-center`}
        >
          {data.images && data.images.jpg && (
            <img
              src={data.images.jpg.image_url}
              alt={data.name}
              className="w-full h-48 sm:h-64 object-cover hover:shadow-lg"
            />
          )}
  
          <div className="p-4 text-center">
            <h3 className="text-lg sm:text-xl font-bold">{data.name}</h3>
            {data.anime && data.anime[0] && (
              <p>Anime: {data.anime[0].anime.title}</p>
            )}
            <p className="flex items-center justify-center mt-2">
              <span className={`w-1/4 border-b-2 ${borderColorClass}`}></span>
              <span className="mx-2">{data.rareza}</span>
              <span className={`w-1/4 border-b-2 ${borderColorClass}`}></span>
            </p>
            <p>Monedas: {data?.monedas}</p>
          </div>
        </div>
      </div>
    );
  };
  
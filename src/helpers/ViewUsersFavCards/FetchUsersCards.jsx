export const FetchUsersCards = async (user, groupBy) => {
  try {
    const response = await fetch(`https://api-rest-card-quest.vercel.app/api/cards/ViewUserCards/${user}`);

    if (!response.ok) {
      throw new Error("Error al realizar la petición");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    switch (groupBy) {
      case "recientes":
        return [...data].reverse();
      case "masAntiguos":
        return data;
      case "rareza":
        const rarityOrder = ["Mitico", "epico", "Raro", "Oro", "Plata", "Comun"];
        return [...data].sort((a, b) => {
          const rarezaA = rarityOrder.indexOf(a.content.rareza);
          const rarezaB = rarityOrder.indexOf(b.content.rareza);
          return rarezaA - rarezaB;
        });
      default:
        return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

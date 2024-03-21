export default async function fetchRanking() {
  const res = async () => {
    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/users/getUsersRank"
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      // setUsersData(data);
      console.log(usersData);
      return data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  return res;
}

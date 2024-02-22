"use client";
import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";

const UsersRanking = () => {
  const [usersData, setUsersData] = useState(null);
  const email = getEmail();

  const getUsersData = async () => {
    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/users/getUsersRank"
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      setUsersData(data);
      console.log(usersData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <br />
      <div className="w-4/5 mx-auto mt-5 responsive-table">
        <table className="min-w-full table-auto border-collapse border text-gray-200 custom-table-border">
          <thead>
            <tr>
              <th className="px-4 py-2 custom-table text-gray-400 text-left">
                Ranking
              </th>
              <th className="px-4 py-2 custom-table text-gray-400 text-left">
                Usuario
              </th>
              <th className="px-4 py-2 custom-table text-gray-400 text-center">
                Cartas
              </th>
              <th className="px-4 py-2 custom-table text-gray-400 text-right">
                Puntos
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData &&
              usersData.map((userData, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 relative">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-2">
                        <img
                          src={userData.user.image}
                          alt="User"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="truncate relative">
                        {userData.user.name}
                        {userData.user.email === email && (
                          <span className="mx-auto custom-table w-12 text-center ml-3 inline-block rounded-full bg-green-300 text-gray-400 text-sm">
                            Usted
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {userData.totalCards}
                  </td>
                  <td className="px-4 py-2 text-right relative right-3">
                    {userData.totalPoints}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        @media screen and (max-width: 600px) {
          .responsive-table p {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default UsersRanking;

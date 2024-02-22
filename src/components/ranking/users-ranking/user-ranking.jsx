"use client"

import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";

const UserRanking = () => {
    const email = getEmail();
    const [userData, setUserData] = useState(null);

    const getUserRanking = async () => {
        try {
            const response = await fetch('http://localhost:3003/api/users/getProfileRank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }) // Aquí se incluye el correo electrónico en el cuerpo
            });
    
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }
    
            const data = await response.json();
            setUserData(data); // Actualiza el estado con los datos obtenidos
            console.log(userData);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    useEffect(() => {
        getUserRanking(); 
    }, []);

    return (
    <>
      <br />
      <div className="w-4/5 mx-auto mt-5 responsive-table">
        <table className="min-w-full table-auto border-collapse border text-gray-200 custom-table-border">
          <thead>
            <tr>
              <th className="px-4 py-2 custom-table text-gray-400 text-left">Ranking</th>
              <th className="px-4 py-2 custom-table text-gray-400 text-left">User</th>
              <th className="px-4 py-2 custom-table text-gray-400 text-center">Cartas</th>
              <th className="px-4 py-2 custom-table text-gray-400 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {userData && (
              <tr>
                <td className="px-4 py-2">{userData?.placeInRanking}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-2">
                      <img src={userData?.user.image} alt="User" className="object-cover w-full h-full" />
                    </div>
                    <p className="max-w-[10rem] truncate">{userData?.user.name}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">{userData?.totalCards}</td>
                <td className="px-4 py-2 text-right">{userData?.totalPoints}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
  
  
  export default UserRanking;
  
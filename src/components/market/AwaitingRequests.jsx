"use client";
import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const AwaitingRequests = () => {
  const [tradeRequests, setTradeRequests] = useState([]);
  const email = getEmail();

  const fetchTradeRequests = async () => {
    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/trade/getAwaitingRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
      }

      const data = await response.json();
      setTradeRequests(data.awaitingRequests);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Función para realizar la llamada a la API
    const fetchData = async () => {
      await fetchTradeRequests();
    };

    // Llamar a la función inicialmente
    fetchData();

    // Configurar el intervalo para realizar la llamada cada segundo
    const intervalId = setInterval(fetchData, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [email]);

  const handleDeleteRequest = async (requestId) => {
    try {
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/trade/deleteTrade/${requestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la solicitud");
      }

      setTradeRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error al eliminar la solicitud:", error);
    }
  };

  return (
    <>
      {/* Solicitudes recibidas */}
      <div className="bg-slate-700 p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-bold mb-4 text-white">
          Solicitudes enviadas pendientes de aceptar
        </h2>
        <div className="custom-scrollbar overflow-y-auto max-h-96">
          {/* Lista de solicitudes recibidas */}
          <ul className="divide-y divide-gray-300">
            {tradeRequests.map((request) => (
              <li key={request._id} className="py-2 flex items-center">
                <div
                  className="w-full"
                  style={{
                    backgroundImage: `url(${request.targetUser.userId.banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="ml-2 bg-white rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-15 lg:w-15 flex items-center justify-center mr-4">
                    <img
                      src={request.targetUser.userId.image}
                      alt="Avatar"
                      className="rounded-full h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow ml-2">
                    <p className="text-white font-bold">
                      {request.targetUser.userId.name}
                    </p>
                    <div className="flex">
                      <button className="bg-slate-700 text-white px-2 py-1 mr-2 rounded hover:bg-slate-800 text-xs md:text-sm">
                        <a href={`/mercado/SolicitudesPendientes/${request._id}`}>Ver Solicitud</a>
                      </button>
                      <button 
                      onClick={() => handleDeleteRequest(request._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs md:text-sm">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AwaitingRequests;

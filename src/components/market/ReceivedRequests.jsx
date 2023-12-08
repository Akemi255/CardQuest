"use client";
import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const ReceivedRequests = () => {
  const [tradeRequests, setTradeRequests] = useState([]);
  const email = getEmail();

  useEffect(() => {
    const fetchTradeRequests = async () => {
      try {
        const response = await fetch(
          "https:/api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/trade/getTradeRequests",
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
        setTradeRequests(data.tradeRequests);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTradeRequests();
  }, [email]);

  return (
    <>
    {/* Solicitudes recibidas */}
    <div className="bg-slate-700 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-white">
        Solicitudes Recibidas
      </h2>
      <div className="custom-scrollbar overflow-y-auto max-h-96"> {/* Ajusta la altura máxima según tus necesidades */}
        {/* Lista de solicitudes recibidas */}
        <ul className="divide-y divide-gray-300">
          {tradeRequests.map((request) => (
            <li key={request._id} className="py-2 flex items-center">
              <div
                className="w-full"
                style={{
                  backgroundImage: `url(${request.requester.userId.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="ml-2 bg-white rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-15 lg:w-15 flex items-center justify-center mr-4">
                  <img
                    src={request.requester.userId.image}
                    alt="Avatar"
                    className="rounded-full h-full w-full object-cover"
                  />
                </div>
                <div className="flex-grow ml-2">
                  <p className="text-white font-bold">
                    {request.requester.userId.name}
                  </p>
                  <div className="flex">
                    <button className="bg-slate-700 text-white px-2 py-1 mr-2 rounded hover:bg-slate-800 text-xs md:text-sm">
                      <a href={`/mercado/SolicitudesRecibidas/${request._id}`}>Ver Solicitud</a>
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs md:text-sm">
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

export default ReceivedRequests;

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";

import { MdDelete } from "react-icons/md";
import { getEmail } from "@/helpers/getEmail";

const ReceivedRequests = () => {
  const [tradeRequests, setTradeRequests] = useState([]);
  const email = getEmail();

  const fetchTradeRequests = async () => {
    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/trade/getTradeRequests",
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchTradeRequests();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
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
      <div className="bg-[#252736] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-white">Received Request</h2>
        <div className="custom-scrollbar overflow-y-auto max-h-96">
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
                    <Image
                      src={request.requester.userId.image}
                      alt="Avatar"
                      width={500}
                      height={500}
                      objectFit="cover"
                      className="rounded-full h-full w-full border-none"
                    />
                  </div>
                  <div className="flex-grow ml-2">
                    <p className="text-white font-bold">
                      {request.requester.userId.name}
                    </p>

                    <div className="flex">
                      <button className="bg-slate-700 text-white px-2 py-1 mr-2 rounded hover:bg-slate-800 text-xs md:text-sm">
                        <Link
                          href={`/trade/1/SolicitudesRecibidas/${request._id}`}
                        >
                          Watch request
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(request._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                      >
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

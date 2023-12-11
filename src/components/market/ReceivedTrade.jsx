import React, { useEffect, useState } from "react";
import { OfferedReceivedCards } from "./MarketUserCards/OfferedReceivedCards";
import { FiSearch } from "react-icons/fi";
import { getEmail } from "@/helpers/getEmail";
import { ProfileMarketCards } from "./MarketUserCards/ProfileMarketCards";
import { fetchUserCards } from "@/helpers/FavCards/fetchUserCards";
import { TargetReceivedCards } from "./MarketUserCards/TargetReceivedCards";
import { ToastContainer, toast } from "react-toastify";

const ReceivedTrade = (ReceivedRequest) => {
  const id = ReceivedRequest.ReceivedRequest;
  const email = getEmail();
  const [tradeData, setTradeData] = useState(null);
  const [searchTermOffered, setSearchTermOffered] = useState("");
  const [searchTermReceived, setSearchTermReceived] = useState("");
  const [addedCards, setAddedCards] = useState([]);
  const [groupBy, setGroupBy] = useState("recientes");
  const [loading, setLoading] = useState(true);
  const [userCards, setUserCards] = useState([]);
  const [visibleOfferedCards, setVisibleOfferedCards] = useState(20);
  const [visibleReceivedCards, setVisibleReceivedCards] = useState(20);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleCardAddedToTrade = (cardId) => {
    setAddedCards((prevAddedCards) => {
      // Verificar si la carta ya está en la lista
      if (prevAddedCards.includes(cardId)) {
        return prevAddedCards;
      }

      // Agregar la nueva carta a la lista
      const newAddedCards = [...prevAddedCards, cardId];
      return newAddedCards;
    });
  };

  const handleSendRequestClick = async () => {
    try {

        if (isRequestSent) {
            toast.error("La solicitud ya ha sido enviada.");
            return;
          }

          if (addedCards.length === 0) {
            toast.error("Selecciona al menos una carta antes de enviar la petición.");
            return;
          }
          
      // Realizar la solicitud POST
      const response = await fetch(
        "https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/trade/editTradeRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            addedCards: addedCards,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Solicitud de intercambio enviada exitosamente");
        setIsRequestSent(true);
        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          window.location.href = "/mercado";
        }, 5000);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  useEffect(() => {
    const fetchUserCardsForOffering = async () => {
      try {
        setLoading(true);
        const data = await fetchUserCards(email, groupBy);
        setUserCards(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCardsForOffering();
  }, [email, groupBy]);

  // Filtrar cartas de la derecha en tiempo real
   const filteredUserCards = userCards.filter(
    (card) =>
      card.content.name.toLowerCase().includes(searchTermOffered.toLowerCase()) ||
      card.content.anime.some((anime) =>
        anime.anime.title.toLowerCase().includes(searchTermOffered.toLowerCase())
      )
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/trade/getTradeRequests/${id}`
        );
        const data = await response.json();
        setTradeData(data);
      } catch (error) {
        console.error("Error fetching trade data:", error);
      }
    };

    fetchData();
  }, [ReceivedRequest]);

  // Filtrar cartas de la izquierda en tiempo real
  const filteredCards =
  tradeData?.tradeRequest?.requester?.cardsOffered?.filter(
    (card) =>
      card.content.name.toLowerCase().includes(searchTermReceived.toLowerCase()) ||
      card.content.anime.some((anime) =>
        anime.anime.title.toLowerCase().includes(searchTermReceived.toLowerCase())
      )
  );

  useEffect(() => {
    const handleOfferedScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setVisibleOfferedCards(
          (prevVisibleOfferedCards) => prevVisibleOfferedCards + 12
        );
      }
    };

    window.addEventListener("scroll", handleOfferedScroll);

    return () => {
      window.removeEventListener("scroll", handleOfferedScroll);
    };
  }, [loading]);

  useEffect(() => {
    const handleReceivedScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setVisibleReceivedCards(
          (prevVisibleReceivedCards) => prevVisibleReceivedCards + 12
        );
      }
    };

    window.addEventListener("scroll", handleReceivedScroll);

    return () => {
      window.removeEventListener("scroll", handleReceivedScroll);
    };
  }, [loading]);

  return (
    <>
      <h1 className="flex justify-center items-center text-2xl font-bold text-white mt-4">
        {tradeData?.tradeRequest?.requester?.userId?.name && (
          <p>{`Ha recibido una petición de intercambio de ${tradeData.tradeRequest.requester.userId.name}`}</p>
        )}
      </h1>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={handleSendRequestClick}
          className="bg-slate-600 px-4 py-2 text-white rounded-md hover:bg-slate-800 text-2xl font-bold  cursor-pointer relative transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
        >
          Enviar petición
        </button>
      </div>
      <div className="flex flex-col md:flex-row mt-8">
        {/* Sección izquierda */}
        <div className="w-full md:w-1/2 p-4 bg-gray-700 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Seleccione las cartas que va a ofrecer</p>
          </h1>
          <div className="flex flex-col md:flex-row items-center mx-auto mt-7">
            <div className="flex items-center md:relative mb-4 md:mb-0 mx-auto">
              <input
                type="text"
                value={searchTermOffered}
                onChange={(e) => setSearchTermOffered(e.target.value)}
                className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
                placeholder="Buscar cartas..."
              />
              <button className="px-2 py-2 rounded-r">
                <FiSearch size={25} />
              </button>
            </div>
          </div>

          {!loading && filteredUserCards.length > 0 && (
            <div className="flex flex-wrap mt-5">
              {filteredUserCards
                .slice(0, visibleOfferedCards)
                .map((card, index) => (
                  <TargetReceivedCards
                    key={index}
                    character={card.content}
                    index={index}
                    id={card._id}
                    onCardAddedToTrade={handleCardAddedToTrade}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Sección derecha */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 p-4 bg-gray-700 shadow-md rounded-md">
          <h1 className="flex justify-center items-center text-2xl font-bold text-white">
            <p>Cartas que recibe</p>
          </h1>
          <div className="flex flex-col md:flex-row items-center mx-auto mt-7">
            <div className="flex items-center md:relative mb-4 md:mb-0 mx-auto">
              <input
                type="text"
                value={searchTermReceived}
                onChange={(e) => setSearchTermReceived(e.target.value)}
                className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
                placeholder="Buscar cartas..."
              />
              <button className="px-2 py-2 rounded-r">
                <FiSearch size={25} />
              </button>
            </div>
          </div>

          {filteredCards && filteredCards.length > 0 && (
            <div className="flex flex-wrap mt-5">
              {filteredCards
                .slice(0, visibleReceivedCards)
                .map((card, index) => (
                  <OfferedReceivedCards
                    key={index}
                    character={card.content}
                    index={index}
                    id={card._id}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceivedTrade;

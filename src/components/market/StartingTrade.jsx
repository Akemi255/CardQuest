import React, { useState, useEffect } from "react";
import OrderOptions from "../SavedCards/OrderOptions";
import { FiSearch } from "react-icons/fi";
import { ProfileMarketCards } from "./MarketUserCards/ProfileMarketCards";
import { fetchUserCards } from "@/helpers/FavCards/fetchUserCards";
import { getEmail } from "@/helpers/getEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartingTrade = ({ user }) => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("recientes");
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("recientes");
  const [loading, setLoading] = useState(true);
  const [addedCards, setAddedCards] = useState([]);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const email = getEmail();

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

      if (userEmail === email) {
        toast.error("No puedes iniciar un intercambio contigo mismo.");
        return;
      }

      if (addedCards.length === 0) {
        toast.error("Selecciona al menos una carta antes de enviar la petición.");
        return;
      }

      // Realizar la solicitud POST
      const response = await fetch(
        "https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/trade/sendTradeRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user,
            email: email,
            cardsOffered: addedCards,
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
    const fetchUserName = async () => {
      try {
        // Realizar la petición a la API
        const response = await fetch(
          `https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/users/getProfileById/${user}`
        );

        // Verificar si la petición fue exitosa (código de respuesta 200)
        if (response.ok) {
          const data = await response.json();

          // Obtener el nombre del usuario desde la respuesta
          const fetchedUserName = data.user.name;

          setUserEmail(data.user.email); 
         
          // Establecer el nombre del usuario en el estado
          setUserName(fetchedUserName);
        } else {
          // Manejar errores en la petición
          console.error("Error en la petición:", response.status);
        }
      } catch (error) {
        console.error("Error al realizar la petición:", error);
      }
    };

    // Llamar a la función de obtención de nombre cuando el componente se monte
    fetchUserName();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [groupBy]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredCards = userCards.filter(
    (card) =>
      card.content.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.content.anime.some((anime) =>
        anime.anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <div className="w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md">
        <h1 className="flex justify-center items-center text-2xl font-bold text-white">
          {userName && <p>{`Ha iniciado un intercambio con ${userName}`}</p>}
        </h1>
        <h1 className="flex justify-center items-center text-2xl font-bold text-white">
          <p>Seleccione las cartas que va a ofrecer</p>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between mx-auto mt-7">
          <div className="flex items-center text-2xl font-bold text-white hover:text-gray-300 relative transition duration-300 ease-in-out cursor-pointer mb-4 md:mb-0">
            <OrderOptions
              setGroupBy={setGroupBy}
              showOrderOptions={showOrderOptions}
              setShowOrderOptions={setShowOrderOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <button
            onClick={handleSendRequestClick}
            className="bg-slate-600 px-4 py-2 text-white rounded-md hover:bg-slate-800 text-2xl font-bold  cursor-pointer relative transition duration-300 ease-in-out  focus:outline-none focus:shadow-outline-blue mb-4 md:mb-0"
          >
            Enviar petición
          </button>
          <div className="flex items-center md:relative  mb-4 md:mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 border rounded-l bg-gray-800 text-white"
              placeholder="Buscar cartas..."
            />
            <button className="px-2 py-2 rounded-r  ">
              <FiSearch size={25} />
            </button>
          </div>
        </div>

        {!loading && userCards.length > 0 && (
          <div className="flex flex-wrap mt-5">
            {filteredCards.slice(0, visibleCards).map((card, index) => (
              <ProfileMarketCards
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
    </>
  );
};

export default StartingTrade;

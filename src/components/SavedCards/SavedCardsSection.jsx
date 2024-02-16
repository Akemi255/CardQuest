import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { ProfileSavedCards } from "./ProfileSavedCards";
import { getEmail } from "@/helpers/getEmail";
import Modal from "react-modal";
import OrderOptions from "./OrderOptions";
import { fetchUserCards } from "@/helpers/FavCards/fetchUserCards";
import '/public/css/profile.css'

const SavedCardsSection = () => {
  const [userCards, setUserCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupBy, setGroupBy] = useState("recientes");
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("recientes");
  const [loading, setLoading] = useState(true);

  const userEmail = getEmail();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserCards(userEmail, groupBy);
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
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setVisibleCards(
          (prevVisibleOfferedCards) => prevVisibleOfferedCards + 12
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const filteredCards = userCards.filter(
    (card) =>
      card?.content?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card?.content?.anime?.some((anime) =>
        anime.anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDeleteCards = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsModalOpen(false);

    try {
      const response = await fetch(
        "https://api-rest-card-quest.vercel.app/api/cards/deleteCards",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Error al realizar la petición de eliminación de cartas"
        );
      }

      setUserCards([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md seccionGuardadas">
        <h1 className="flex justify-center items-center text-xl font-bold text-white">
          TUS CARTAS
        </h1>
        <div className="flex  items-center justify-center mt-3 gap-20 group-filter">
          <div className="flex items-center text-base text-white hover:text-gray-300 transition duration-300 ease-in-out cursor-pointer mb-4 md:mb-0 text-base">
            <OrderOptions
              setGroupBy={setGroupBy}
              showOrderOptions={showOrderOptions}
              setShowOrderOptions={setShowOrderOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <div className="flex items-center md:left-7 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" px-10 py-2 border text-black w-96 barra"
                placeholder="Buscar..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FiSearch size={25} color="black"/>
              </div>
            </div>
          </div>
          <div>
            <h2
              className="flex items-center md:mr-7 text-base text-white cursor-pointer hover:text-black relative transition duration-300 ease-in-out"
              onClick={handleDeleteCards}
            >
              <BiSolidTrashAlt size={25} color="white" /> Eliminar Cartas
            </h2>
          </div>
        </div>
        {!loading && userCards.length > 0 && (
          <div className="flex flex-wrap mt-5 gap">
            {filteredCards.slice(0, visibleCards).map((card, index) => (
              <ProfileSavedCards
                key={index}
                character={card.content}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirmar eliminación"
        className="absolute modal top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-md p-4 text-white w-80 h-80"
        overlayClassName="fixed inset-0 "
        ariaHideApp={false}
        style={{
          overlay: {
            zIndex: 1000 // Z-index para el overlay del modal
          },
          content: {
            zIndex: 1001 // Z-index para el contenido del modal
          }
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          ¿Está seguro de que desea eliminar todas sus cartas?
        </h2>
        <p className="mb-4">Esta acción no tiene vuelta atrás.</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
          onClick={confirmDelete}
        >
          Sí
        </button>
        <button
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
          onClick={cancelDelete}
        >
          Cancelar
        </button>
      </Modal>
    </>
  );
};

export default SavedCardsSection;

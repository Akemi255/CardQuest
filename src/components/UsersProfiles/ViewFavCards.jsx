import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FetchUsersCards } from "@/helpers/ViewUsersFavCards/FetchUsersCards";
import { ProfileSavedCards } from "../SavedCards/ProfileSavedCards";
import OrderOptions from "../SavedCards/OrderOptions";
import Modal from "react-modal";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { SetEmail } from "@/helpers/SetEmail";

const ViewFavCards = ({ user }) => {
  const [userCards, setUserCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupBy, setGroupBy] = useState("recientes");
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("recientes");
  const [reportMessage, setReportMessage] = useState("");
  const [reportMessageColor, setReportMessageColor] = useState("");
  const [loading, setLoading] = useState(true);

  const userEmail = SetEmail();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await FetchUsersCards(user, groupBy);
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
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDeleteCards = async () => {
    setIsModalOpen(true);
  };

  const filteredCards = userCards.filter(
    (card) =>
      card.content.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.content.anime.some((anime) =>
        anime.anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const confirmReport = async () => {
    try {
      const cause = document.getElementById("causeInput").value;

      const formData = new URLSearchParams();
      formData.append("reporterEmail", userEmail);
      formData.append("cause", cause);
      formData.append("id", user);

      const response = await fetch(
        "http://localhost:3002/api/users/reportUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setReportMessage("Ha ocurrido un error");
        setReportMessageColor("red");
      }

      console.log("Petición de reporte ejecutada correctamente");
      // Si la petición fue exitosa, actualiza el mensaje del reporte y su color
      setReportMessage("Reporte enviado correctamente");
      setReportMessageColor("green");
      setTimeout(() => {
        setReportMessage("");
        setReportMessageColor("");
        setIsModalOpen(false);
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setReportMessage("Ha ocurrido un error");
      setReportMessageColor("red");
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md">
        <h1 className="flex justify-center items-center text-2xl font-bold text-white">
          Cartas guardadas
        </h1>
        <div className="flex items-center justify-between mx-auto mt-7">
          <div className="flex items-center text-2xl font-bold text-white hover:text-gray-300 relative transition duration-300 ease-in-out cursor-pointer">
            <OrderOptions
              setGroupBy={setGroupBy}
              showOrderOptions={showOrderOptions}
              setShowOrderOptions={setShowOrderOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <div className="flex items-center relative left-9">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-l bg-gray-800 text-white"
              placeholder="Buscar cartas..."
            />
            <button className="px-4 py-2 rounded-r">
              <FiSearch size={25} />
            </button>
          </div>
          <h2
            className="flex items-center mr-9 text-2xl font-bold text-white cursor-pointer hover:text-red-700 relative transition duration-300 ease-in-out"
            onClick={handleDeleteCards}
          >
            Reportar usuario{" "}
            <MdOutlineReportGmailerrorred size={32} color="red" />
          </h2>
        </div>

        {!loading && userCards.length > 0 && (
          <div className="flex flex-wrap mt-5">
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-md p-4 text-white w-80"
        overlayClassName="fixed inset-0"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">
          Escriba la razón por la que desea reportar a este usuario
        </h2>
        <input
          type="text"
          id="causeInput"
          placeholder="Causa del reporte"
          className="mb-4 w-full text-black"
        />

        <p
          style={{ backgroundColor: reportMessageColor }}
          className="flex justify-center items-center"
        >
          {reportMessage === "Reporte enviado correctamente" ? (
            <>
              <FaCheck />
              &nbsp;
              {reportMessage}
            </>
          ) : (
            reportMessage
          )}
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
          onClick={confirmReport}
        >
          Enviar
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

export default ViewFavCards;

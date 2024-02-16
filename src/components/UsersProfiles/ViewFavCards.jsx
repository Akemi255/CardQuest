import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FetchUsersCards } from "@/helpers/ViewUsersFavCards/FetchUsersCards";
import { ProfileSavedCards } from "../SavedCards/ProfileSavedCards";
import OrderOptions from "../SavedCards/OrderOptions";
import Modal from "react-modal";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { SetEmail } from "@/helpers/SetEmail";
import '/public/css/profile.css'

const ViewFavCards = ({ user }) => {
  const [userCards, setUserCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(20);
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
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setVisibleCards((prevVisibleOfferedCards) => prevVisibleOfferedCards + 12);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const handleDeleteCards = async () => {
    setIsModalOpen(true);
  };

  const filteredCards = userCards.filter(
    (card) =>
      card?.content?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card?.content?.anime?.some((anime) =>
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
        "https://api-rest-card-quest.vercel.app/api/users/reportUser",
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
      <div className="w-full mt-8 p-4 bg-gray-700 shadow-md rounded-md seccionGuardadas">
        <h1 className="flex justify-center items-center text-xl font-bold text-white">
          Cartas guardadas
        </h1>
        <div className="flex  items-center justify-center mt-3 gap-20 ">
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
            <span className="w-32">&nbsp;</span>
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
    </>
  );
};

export default ViewFavCards;

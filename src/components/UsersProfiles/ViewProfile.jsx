import { SetEmail } from "@/helpers/SetEmail";
import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaExclamationTriangle } from 'react-icons/fa';

import Modal from "react-modal";
import { FaCheck } from "react-icons/fa6";

const ViewProfile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: "User",
    nick: "undefined",
    emailAddress: "",
    image: 'https://i.postimg.cc/ZRvmNYYp/foto-perfil150.png',
    banner: 'https://i.postimg.cc/VNN272ND/paisaje.png',
    bio: "undefined",
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [isItMe, setIsItMe] = useState(false);
  const [followData, setFollowData] = useState(null);

  const loggedInUserEmail = SetEmail();

  const handleDeleteCards = async () => {
    setIsModalOpen(true);
  };


  const fetchFollowDataById = async () => {
    try {
      const response = await fetch(
        `https://api-rest-card-quest.vercel.app/api/follows/getFollowDataById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos de seguimiento por ID");
      }

      const result = await response.json();
      setFollowData(result);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/users/getProfileById/${user}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }
        const userData = await response.json();
        setUserProfile(userData.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    const checkIfFollowing = async () => {
      try {
        const userEmail = loggedInUserEmail;

        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/follows/isFollowing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              targetId: user,
            }),
          }
        );

      

        const result = await response.json();
        setIsFollowing(result.isFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    const checkIfMe = async () => {
      try {
        const response = await fetch(
          `https://api-rest-card-quest.vercel.app/api/follows/itsme`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              targetId: user,
              userEmail: loggedInUserEmail,
            }),
          }
        );

     

        const result = await response.json();
        setIsItMe(result.result);
      } catch (error) {
        console.error(error);
      }
    };

   

    fetchUserProfile();
    checkIfFollowing();
    checkIfMe();
    fetchFollowDataById(); // Llama a la nueva función
  }, [user, loggedInUserEmail]);

  const handleFollow = async () => {
    try {
      const userEmail = getEmail();
      if (userEmail === userProfile.emailAddress) {
        console.error("No puedes seguirte a ti mismo");
        return;
      }
      // Define el endpoint y el método según si ya estás siguiendo al usuario
      const endpoint = isFollowing
        ? `https://api-rest-card-quest.vercel.app/api/follows/deleteFollow`
        : `https://api-rest-card-quest.vercel.app/api/follows/saveFollow`;
      const method = isFollowing ? "DELETE" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          targetId: user,
        }),
      });

      if (!response.ok) {
        throw new Error(
          isFollowing
            ? "Error al dejar de seguir al usuario"
            : "Error al seguir al usuario"
        );
      }

      fetchFollowDataById();

      
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [reportMessageColor, setReportMessageColor] = useState("");


  const confirmReport = async () => {
    try {
      const cause = document.getElementById("causeInput").value;

      const formData = new URLSearchParams();
      formData.append("reporterEmail", loggedInUserEmail);
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
      {!loading && (
        <div className="mx-auto w-5/5 mt-4 p-4 bg-gray-700 shadow-md rounded-md seccionGuardadas">
          {/* Profile Banner */}
          <div
            className="relative rounded-t-md"
            style={{
              backgroundImage: `url(${userProfile.banner})`,
              height: "250px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            {/* Profile Image */}
            <img
              src={userProfile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute bottom-0 transform -translate-x-1/2 translate-y-1/2"
              style={{
                left: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* User Info */}
          <div className="mt-10 p-4 flex flex-col items-center text-center">
            <h2 className="text-2xl text-white">{userProfile.name} </h2>
            <p className="text-white">@{userProfile.nick}</p>
            <p className="text-white">{userProfile.bio}</p>
          </div>
          {followData && (
          <div className="flex justify-center items-center">
              <p className="text-white text-center w-32">
                Siguiendo: {followData.followingCount} 
              </p>
              <img src="https://i.postimg.cc/XYy11bcj/gema-blanca.png" alt="gema-blanca" className="w-5"/>
              <p className="text-white text-center w-32">
                Seguidores:{" "}{followData.followersCount}
              </p>
          </div>
          )}
          <div className="flex justify-between items-centers mt-2">
            <h2
              className="flex items-center md:mr-7 text-base text-white cursor-pointer hover:text-black relative transition duration-300 ease-in-out"
              onClick={handleDeleteCards}
            >
              &nbsp;
              <FaExclamationTriangle style={{ color: '#FFD43B' }} />
              &nbsp;
              Reportar
            </h2>
            {!isItMe && (
                <button
                  className="bg-white hover:bg-gray-600 text-black px-4 rounded-full w-32 h-7"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Siguiendo" : "Seguir"}
                </button>
            )}
            <span className="w-32">&nbsp;</span>
            </div>
        </div>
      )}
        <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirmar eliminación"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-md p-4 text-white w-80"
        overlayClassName="fixed inset-0 z-50"
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

export default ViewProfile;

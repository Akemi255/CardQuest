import React, { useEffect, useState } from "react";
import EditProfileModal from "@/components/UserProfile/EditProfileModal";
import { BsPencilSquare } from "react-icons/bs";
import { getEmail } from "@/helpers/getEmail";

const UserProfileCard = ({ userProfile, modalIsOpen, setModalIsOpen }) => {
  const [followData, setFollowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = getEmail();

        const response = await fetch(
          "http://localhost:3002/api/follows/getFollowData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: storedEmail }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFollowData(data);
        } else {
          const errorData = await response.json();
          console.error(
            "Error obteniendo datos de seguimiento:",
            errorData.message || "Error desconocido"
          );
        }
      } catch (error) {
        console.error(
          "Error obteniendo datos de seguimiento:",
          error.message || "Error desconocido"
        );
      }
    };

    fetchData(); // Llama a la función al montar el componente
  }, []);

  return (
    <div className="mx-auto w-5/5 mt-4 p-4 bg-gray-700 shadow-md rounded-md">
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
        <h2 className="text-2xl text-white">
          {userProfile.name}{" "}
          <button
            onClick={() => setModalIsOpen(true)}
            className=" font-bold mt-4"
          >
            <BsPencilSquare size={20} color="white" />
          </button>
        </h2>
        <p className="text-gray-500 ">@{userProfile.nick}</p>
        <p className="text-white">{userProfile.bio}</p>
      </div>
      {followData && (
        <p className="text-gray-500 text-center">
          Siguiendo: {followData.followingCount} | Seguidores:{" "}
          {followData.followersCount}
        </p>
      )}

      <EditProfileModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default UserProfileCard;

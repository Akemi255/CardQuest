import React from "react";
import EditProfileModal from "@/components/EditProfileModal";
import { BsPencilSquare } from "react-icons/bs";

const UserProfileCard = ({ userProfile, modalIsOpen, setModalIsOpen }) => {
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
        <p className="mt-2 text-white">{userProfile.bio}</p>
      </div>

      <EditProfileModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default UserProfileCard;

"use client";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import Footer from "@/components/footer";
import EditProfileModal from "@/components/EditProfileModal";

const DashboardPage = () => {
  const user = useUser();
  let email = "";

  let userProfile = {
    name: "John Doe",
    username: "johndoe123",
    emailAddress: "johndoe@example.com",
    profileImage: "https://media.tenor.com/XrKq6FDwUJMAAAAC/emilia.gif",
    profileBanner:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/586bd591-59c0-428c-9b0c-697263cf4ae2/d95cau2-80d70b88-0d16-41f4-857e-fdaf6da65b92.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU4NmJkNTkxLTU5YzAtNDI4Yy05YjBjLTY5NzI2M2NmNGFlMlwvZDk1Y2F1Mi04MGQ3MGI4OC0wZDE2LTQxZjQtODU3ZS1mZGFmNmRhNjViOTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WNB2VDYos5lzYb-ZL6L0QRJaVHFXwLFy1VA0u1zj7jk",
    bio: "hola este es un texto de prueba para mi bio",
  };

  if (user && user.user && user.user.primaryEmailAddress) {
    email = user.user.primaryEmailAddress.emailAddress;
    console.log("Email:", email);
  } else {
    console.log(
      "Email not available. User might not be authenticated or email data is missing."
    );
  }

  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

 
  return (
    <>
      <Header />
      <div className="mx-auto w-5/5 mt-4 p-4 bg-gray-700 shadow-md rounded-md">
        {/* Profile Banner */}
        <div
          className="relative rounded-t-md"
          style={{
            backgroundImage: `url(${userProfile.profileBanner})`,
            height: "250px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%" // Evita que se repita la imagen si no ocupa todo el contenedor
          }}
        >
          {/* Profile Image */}
          <img
            src={userProfile.profileImage}
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
          <h2 className="text-2xl font-bold">
            {userProfile.name}{" "}
            <button
              onClick={() => setModalIsOpen(true)}
              className=" font-bold mt-4"
            >
              <BsPencilSquare size={20} color="white" />
            </button>
          </h2>
          <p className="text-gray-500">@{userProfile.username}</p>
          <p className="mt-2">{userProfile.emailAddress}</p>
          <p className="mt-2">{userProfile.bio}</p>
        </div>
      
        <EditProfileModal
          isOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          
        />


      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;

"use client";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Footer from "@/components/footer";
import EditProfileModal from "@/components/EditProfileModal";
import fetchCharacterData from "@/helpers/fetchCharacterData";

const DashboardPage = () => {
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: "User",
    nick: "undefined",
    emailAddress: "",
    image: "https://via.placeholder.com/150",
    banner: "https://via.placeholder.com/1200x250",
    bio: "undefined",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }

      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/users/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            name: data.user.name,
            nick: data.user.nick,
            emailAddress: data.user.email,
            image: data.user.image,
            banner: data.user.banner,
            bio: data.user.bio,
          }));
          localStorage.setItem('userProfile', JSON.stringify({
            name: data.user.name,
            nick: data.user.nick,
            emailAddress: data.user.email,
            image: data.user.image,
            banner: data.user.banner,
            bio: data.user.bio,
          }));
         
          
        } else {
          
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [email]);

 

  return (
    <>
      <Header />
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
            width: "100%", // Evita que se repita la imagen si no ocupa todo el contenedor
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
          <h2 className="text-2xl font-bold">
            {userProfile.name}{" "}
            <button
              onClick={() => setModalIsOpen(true)}
              className=" font-bold mt-4"
            >
              <BsPencilSquare size={20} color="white" />
            </button>
          </h2>
          <p className="text-gray-500">@{userProfile.nick}</p>
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

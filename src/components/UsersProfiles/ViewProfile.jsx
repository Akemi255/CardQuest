import { SetEmail } from "@/helpers/SetEmail";
import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";

const ViewProfile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: "User",
    nick: "undefined",
    emailAddress: "",
    image: "https://via.placeholder.com/150",
    banner: "https://via.placeholder.com/1200x250",
    bio: "undefined",
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [isItMe, setIsItMe] = useState(false);
  const [followData, setFollowData] = useState(null);

  const loggedInUserEmail = SetEmail();


  const fetchFollowDataById = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/follows/getFollowDataById`,
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
          `http://localhost:3002/api/users/getProfileById/${user}`
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
          `http://localhost:3002/api/follows/isFollowing`,
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
          `http://localhost:3002/api/follows/itsme`,
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
        ? `http://localhost:3002/api/follows/deleteFollow`
        : `http://localhost:3002/api/follows/saveFollow`;
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

  return (
    <>
      {!loading && (
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
            <h2 className="text-2xl text-white">{userProfile.name} </h2>
            <p className="text-gray-500">@{userProfile.nick}</p>
            <p className="text-white">{userProfile.bio}</p>
          </div>
          {followData && (
            <p className="text-gray-500 text-center">
              Siguiendo: {followData.followingCount} | Seguidores: {followData.followersCount}
            </p>
          )}
          <div className="flex justify-center items-centers mt-2">
            {!isItMe && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Dejar de Seguir" : "Seguir"}
                </button>
              )}
            </div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;

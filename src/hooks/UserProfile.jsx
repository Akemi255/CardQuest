import { getEmail } from "@/helpers/getEmail";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "User",
    nick: "undefined",
    emailAddress: "",
    image: "https://via.placeholder.com/150",
    banner: "https://via.placeholder.com/1200x250",
    bio: "undefined",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }

        if (!email.trim()) {
          // Si email está vacío o solo contiene espacios en blanco, no hagas la solicitud
          return;
        }
        
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        }

        const response = await fetch("https://api-rest-card-quest.vercel.app/api/users/profile", {
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
          localStorage.setItem(
            "userProfile",
            JSON.stringify({
              name: data.user.name,
              nick: data.user.nick,
              emailAddress: data.user.email,
              image: data.user.image,
              banner: data.user.banner,
              bio: data.user.bio,
            })
          );
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error desconocido");
        }
      } catch (error) {
        setError("Error desconocido");
      } finally {
        setLoading(false);
      }
    };

   

    fetchUserProfile();
  }, [email]);

  return { userProfile, loading, email };
};

export default UserProfile;

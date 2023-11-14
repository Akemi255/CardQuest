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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }

        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        }

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
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [email]);

  return { userProfile, loading, email };
};

export default UserProfile;

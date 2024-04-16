import { getEmail } from "@/helpers/getEmail";
import { fetchFollowDataById } from "./fetchFollowDataById";

import { toast } from "react-toastify";

export const handleFollow = async (
  user,
  isFollowing,
  setIsFollowing,
  setFollowData,
  profileData
) => {
  try {
    const userEmail = getEmail();
    if (userEmail === profileData.emailAddress) {
      toast.error("No puedes seguirte a ti mismo");
      return;
    }
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

    setIsFollowing(!isFollowing);

    fetchFollowDataById(user, setFollowData);
  } catch (error) {
    console.error(error);
  }
};

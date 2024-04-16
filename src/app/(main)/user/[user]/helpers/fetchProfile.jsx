export const fetchProfile = async (user, setProfileData) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/users/getProfileById/${user}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    setProfileData(data.user);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

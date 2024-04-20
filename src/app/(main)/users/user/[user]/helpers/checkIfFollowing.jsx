export const checkIfFollowing = async (email, user, setIsFollowing) => {
  try {
    const userEmail = email;

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
    console.error("Error checking if following:", error);
  }
};

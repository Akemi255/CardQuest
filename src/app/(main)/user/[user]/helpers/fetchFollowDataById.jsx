export const fetchFollowDataById = async (userId, setFollowData) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/follows/getFollowDataById`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching follow data by ID");
    }

    const result = await response.json();
    setFollowData(result);
  } catch (error) {
    console.error("Error fetching follow data:", error);
    setFollowData(null);
  }
};

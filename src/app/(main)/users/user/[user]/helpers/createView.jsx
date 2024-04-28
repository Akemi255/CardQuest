export const createView = async (viewerEmail, targetUserId, setViews) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/views/createView/${viewerEmail}/${targetUserId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    setViews(responseData.totalViews);
  } catch (error) {
    console.error(error);
  }
};

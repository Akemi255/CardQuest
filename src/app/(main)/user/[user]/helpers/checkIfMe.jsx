export const checkIfMe = async (user, email, setIsItMe) => {
  try {
    const response = await fetch(
      `https://api-rest-card-quest.vercel.app/api/follows/itsme`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetId: user,
          userEmail: email,
        }),
      }
    );

    const result = await response.json();
    setIsItMe(result.result);
  } catch (error) {
    console.error(error);
  }
};

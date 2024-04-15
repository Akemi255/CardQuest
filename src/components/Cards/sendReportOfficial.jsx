export const sendReportOfficial = async (email) => {
  try {
    const formData = new URLSearchParams();
    formData.append("reporterEmail", email);

    const response = await fetch(
      "https://api-rest-card-quest.vercel.app/api/users/reportOfficial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );
  } catch (error) {
    console.error("Error al realizar la petición POST:", error.message);
  }
};

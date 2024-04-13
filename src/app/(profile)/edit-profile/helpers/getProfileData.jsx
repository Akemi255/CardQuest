export const getProfileData = async (
  email,
  register,
  setProfileImage,
  setBannerImage,
  setValue,
  setShowForm
) => {
  if (typeof email === "string") {
    const response = await fetch(
      "https://api-rest-card-quest.vercel.app/api/users/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = await response.json();

    setProfileImage(data.user.image);
    setBannerImage(data.user.banner);
    setValue("name", data.user.name);
    setValue("nick", data.user.nick);
    setValue("bio", data.user.bio);

    // Establecer los valores de las redes sociales si están presentes
    if (data.user.twitter) {
      setValue("twitter", data.user.twitter);
    }
    if (data.user.instagram) {
      setValue("instagram", data.user.instagram);
    }
    if (data.user.facebook) {
      setValue("facebook", data.user.facebook);
    }
    if (data.user.spotify) {
      setValue("spotify", data.user.spotify);
    }

    setShowForm(true);
  }
};

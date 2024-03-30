export const getProfileData = async (
  email,
  register,
  setProfileImage,
  setBannerImage,
  setValue,
  setShowForm
) => {
  if (email) {
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
    setShowForm(true);
  }
};

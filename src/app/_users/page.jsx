import Footer from "@/components/Layout/footer";
import Header from "@/components/Layout/Header";

import UsersProfiles from "@/components/UsersProfiles/UsersProfiles";

const page = () => {
  return (
    <div className="back-profile">
      <Header />
      <UsersProfiles />
      <Footer />
    </div>
  );
};

export default page;

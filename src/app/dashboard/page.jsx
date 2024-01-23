"use client";
import Header from "@/components/Layout/Header";
import { useState } from "react";
import UserProfile from "@/hooks/UserProfile";
import UserProfileCard from "@/components/UserProfile/UserProfileCard";
import SavedCardsSection from "@/components/SavedCards/SavedCardsSection";
import { SetEmail } from "@/helpers/SetEmail";
import Footer from "@/components/Layout/footer";

const DashboardPage = () => {
  let email = SetEmail();
  const { userProfile, loading } = UserProfile();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) {
    return (
      <>
        <Header />
      </>
    );
  }

  return (
    <>
      <Header />
      <UserProfileCard
        userProfile={userProfile}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />

      <SavedCardsSection />
      <br />
      <Footer />
    </>
  );
};

export default DashboardPage;

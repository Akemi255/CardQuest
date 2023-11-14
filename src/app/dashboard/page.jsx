"use client";
import Header from "@/components/Header";
import { useState } from "react";
import Footer from "@/components/footer";
import UserProfile from "@/components/UserProfile";
import UserProfileCard from "@/components/UserProfileCard";
import SavedCardsSection from "@/components/SavedCardsSection";

const DashboardPage = () => {
  const { userProfile, loading, email } = UserProfile();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) {
    return (
      <>
        <Header />
        <Footer />
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
      
    </>
  );
};

export default DashboardPage;
"use client";
import Header from "@/components/Layout/Header";
import { useState } from "react";
import Footer from "@/components/Layout/footer";
import UserProfile from "@/components/UserProfile/UserProfile";
import UserProfileCard from "@/components/UserProfile/UserProfileCard";
import SavedCardsSection from "@/components/SavedCards/SavedCardsSection";



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
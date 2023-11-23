"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Layout/Header';
import ViewProfile from '@/components/UsersProfiles/ViewProfile';
import ViewFavCards from '@/components/UsersProfiles/ViewFavCards';
import Footer from '@/components/Layout/Footer';


const User = () => {
  const { user } = useParams();

  return <> 
  
  <Header/>
  
  <ViewProfile user={user}/>
  <ViewFavCards user={user}/>
  <br />
  <Footer/>
  </>;
};

export default User;

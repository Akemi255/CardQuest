"use client";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import { UserProfile } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react'


const UserSettings = () => {

  return (
    <>
    <Header/>
    <UserProfile />
    <br />
      <Footer />
    </>
  )
}

export default UserSettings
"use client";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import StartingTrade from '@/components/market/StartingTrade';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { user } = useParams();
  
  return (
    <>
    <Header/>
    <StartingTrade user={user} />
    <br />
    <Footer/>
    </>
  )
}

export default page
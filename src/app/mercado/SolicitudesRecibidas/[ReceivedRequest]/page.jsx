"use client";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import ReceivedTrade from '@/components/market/ReceivedTrade';
import { useParams } from 'next/navigation'

const page = () => {
  const { ReceivedRequest } = useParams();
  
  return (
    <>
    <Header/>
    <ReceivedTrade ReceivedRequest={ReceivedRequest}/>
    <br />
    <Footer/>
    </>
  )
}

export default page
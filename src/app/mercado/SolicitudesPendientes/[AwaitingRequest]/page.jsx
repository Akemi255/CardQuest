"use client";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import AwaitingTrade from '@/components/market/AwaitingTrade';
import { useParams } from 'next/navigation'

const page = () => {
  const { AwaitingRequest } = useParams();
  
  return (
    <>
    <Header/>
    <AwaitingTrade AwaitingRequest={AwaitingRequest}/>
    <br />
    <Footer/>
    </>
  )
}

export default page
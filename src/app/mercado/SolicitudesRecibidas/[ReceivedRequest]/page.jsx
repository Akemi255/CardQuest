"use client";
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import { useParams } from 'next/navigation'

const page = () => {
  const { ReceivedRequest } = useParams();
  
  return (
    <>
    <Header/>
    
    <br />
    <Footer/>
    </>
  )
}

export default page
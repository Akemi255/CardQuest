import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/footer'
import UserRanking from '@/components/ranking/users-ranking/user-ranking'
import UsersRanking from '@/components/ranking/users-ranking/users-ranking'
import React from 'react'


const page = () => {
  return (
    <>
    <Header />

    <UsersRanking/>
    <br />
    <br />
    <Footer/>
    </>
  )
}

export default page
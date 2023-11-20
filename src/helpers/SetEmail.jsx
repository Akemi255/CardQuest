"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react'

export const SetEmail = () => {
    const user = useUser();
    let email = "";
  
    if (user?.user?.primaryEmailAddress) {
      email = user.user.primaryEmailAddress.emailAddress;
      localStorage.setItem("email", email);
    }
  
    return email 
  }
      
    
  


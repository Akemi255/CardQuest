'use client';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ToastContainer, toast } from "react-toastify";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="6px"
        color="#103a6e"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ToastContainer 
       position="bottom-right"
       autoClose={3000}
      />
    </>
  );
};

export default Providers;

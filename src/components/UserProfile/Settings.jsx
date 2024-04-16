"use client";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { IoSettingsSharp } from "react-icons/io5";
import { UserProfile } from "@clerk/nextjs";

const Settings = ({ defaultOpen = false }) => {
  const [modalIsOpen, setModalIsOpen] = useState(defaultOpen);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    content: {
      position: "relative",

      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
      maxWidth: "80%",
      maxHeight: "80%",
      padding: "20px",
      background: "#1f2d3a",
      textAlign: "center",
      outline: "none",
    },
  };

  // useEffect para abrir o cerrar el modal en función de la prop defaultOpen
  useEffect(() => {
    setModalIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <>
      <div className="flex justify-center items-center">
        <button onClick={modalIsOpen ? closeModal : openModal}>
          {modalIsOpen ? "Ocultar cuenta" : "Administrar cuenta"}
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="UserProfile Modal"
        ariaHideApp={false}
      >
        <button onClick={closeModal} className="close-button">
          Cerrar
        </button>
        <UserProfile />
      </Modal>
    </>
  );
};

export default Settings;

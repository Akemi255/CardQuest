import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Modal from "react-modal"; // Importa la librería de modales
import { UserProfile } from "@clerk/nextjs";



const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <button
          className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
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

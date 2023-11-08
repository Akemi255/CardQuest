
import { useState } from "react";
import Modal from "react-modal";
import { IoClose } from 'react-icons/io5';

const EditProfileModal = ({ isOpen, closeModal }) => {
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    bio: ""
  });
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario, puedes usar formValues para obtener los valores
    console.log(e);
    closeModal();
  };



  return (
    <Modal 
      isOpen={isOpen} // Prop recibida para determinar si el modal está abierto o cerrado
      onRequestClose={closeModal} // Función para cerrar el modal
      contentLabel="Editar Perfil Modal"
      className="w-4/5 mx-auto my-12 p-8 bg-gray-700 rounded-md shadow-md modal"
      ariaHideApp={false}
    >
    {/* Contenido del modal */}
    <h2 className="text-2xl mb-4 text-gray-300 text-center">Editar Perfil</h2>
   
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
   
      <label
        htmlFor="bannerImageInput"
        className="block cursor-pointer mb-4"
      >
        <div className="banner w-44 h-24 border-4 border-white shadow-lg relative top-12 cursor-pointer overflow-hidden">
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner Preview"
              className="w-full h-full object-cover cursor-pointer "
            />
          ) : (
            <span
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
              style={{
                fontSize: "0.8rem",
              }}
            >
              Insertar Imagen de Banner
            </span>
          )}
          <input
            type="file"
            id="bannerImageInput"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleBannerImageChange}
          />
        </div>
      </label>

      <label htmlFor="profileImageInput" className="block cursor-pointer">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg relative cursor-pointer overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-full h-full object-cover cursor-pointer"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex justify-center items-center text-white cursor-pointer">
              <span>Seleccionar Imagen</span>
            </div>
          )}
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleProfileImageChange}
          />
        </div>
      </label>

      <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="p-2 border rounded-md mt-2 w-1/2"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Nick"
          className="p-2 border rounded-md mt-2 w-1/2"
          value={formValues.username}
          onChange={handleInputChange}
        />
        <textarea
          name="bio"
          placeholder="Biografía"
          className="p-2 border rounded-md mt-2 w-1/2"
          rows="4"
          value={formValues.bio}
          onChange={handleInputChange}
        ></textarea>
        <div className="flex justify-center w-full mt-6 gap-4">

        <button onClick={() => closeModal()} className="px-4 py-2 relative bottom-3 bg-slate-800 text-white rounded-md hover:bg-slate-700">
            Cancelar
          </button>


          <button type="submit" className="px-4 py-2 relative bottom-3 bg-slate-800 text-white rounded-md hover:bg-slate-700">
           Actualizar
          </button>
          
         
        </div>
        
      </form>
    </Modal>
  );
};

export default EditProfileModal;

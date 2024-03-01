import { useState, useEffect } from "react";
import Modal from "react-modal";
import Header from "@/components/Layout/Header";
import { useUser } from "@clerk/nextjs";
import 'public/css/profile.css'

const EditProfileModal = ({ isOpen, closeModal }) => {
  const user = useUser();
  let email = "";
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    nick: "",
    bio: "",
  });
  if(isOpen){
    if (window.innerHeight < 600) {
      // Si la altura de la pantalla es menor que 600px, deshabilitar el desplazamiento
      document.body.style.overflow = 'hidden';
    }
  }else{
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user && user.user && user.user.primaryEmailAddress) {
      email = user.user.primaryEmailAddress.emailAddress;

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("nick", formValues.nick);
      formData.append("bio", formValues.bio);
      formData.append("email", email);
     
      if (profileImage) {
        formData.append("profileImage", dataURItoBlob(profileImage));
      }
      
      if (bannerImage) {
        formData.append("bannerImage", dataURItoBlob(bannerImage));
      }
      
      // Función para convertir el formato de datos URI a Blob
      function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: "image/jpeg" }); // Ajusta el tipo según tus necesidades
      }
      

      try {
        const response = await fetch("https://api-rest-card-quest.vercel.app/api/users/update", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 100);
          // Puedes realizar alguna acción adicional después de la actualización exitosa
        } else {
          const data = await response.json();
          console.error("Error al actualizar el usuario:", data.message);
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de actualización:",
          error
        );
      }
    } else {
      console.log(
        "Email not available. User might not be authenticated or email data is missing."
      );
    }
  };

  return (
      <Modal
        isOpen={isOpen} // Prop recibida para determinar si el modal está abierto o cerrado
        onRequestClose={closeModal} // Función para cerrar el modal
        contentLabel="Editar Perfil Modal"
        className="w-4/5 mx-auto my-12 p-8 rounded-3xl shadow-md modal-edit "
        style={{
          overlay: {
            backgroundColor: 'rgba(80, 69, 104, 0.5)', 
            backdropFilter: 'blur(8px)', // Aplica el desenfoque al fondo
            overflowY: 'hidden',
            zIndex: 9999,
          }
        }}
        ariaHideApp={false}
      >
        {/* Contenido del modal */}
        <h2 className="text-2xl mb-4 text-gray-300 text-center">Editar Perfil</h2>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label htmlFor="bannerImageInput" className="block cursor-pointer mb-4">
            <div className="banner h-24 shadow-lg relative top-12 cursor-pointer overflow-hidden banner-edit">
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  className=" h-full object-cover cursor-pointer "
                />
              ) : (
                <span
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl color-insert"
                >
                  INSERTAR IMAGEN
                </span>
              )}
              <input
                type="file"
                id="bannerImageInput"
                accept="image/*"
                className="absolute inset-0  h-full opacity-0 cursor-pointer"
                onChange={handleBannerImageChange}
              />
            </div>
          </label>

          <label htmlFor="profileImageInput" className="block cursor-pointer">
            <div className="w-24 h-24 rounded-full shadow-lg relative cursor-pointer overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex justify-center items-center text-white cursor-pointer">
                  <span className="color-insert text-center" >INSERTAR IMAGEN</span>
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
          <div className="my-2.5">
            <img src="/assets/forms-barra.png" alt="gema"/>
          </div>
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
            name="nick"
            placeholder="Nombre de usuario"
            className="p-2 border rounded-md mt-2 w-1/2"
            value={formValues.nick}
            onChange={handleInputChange}
          />
          <textarea
            name="bio"
            placeholder="Descripcion"
            className="p-2 border rounded-md mt-2 w-1/2 textArea resize-none outline-none"
            rows="4"
            value={formValues.bio}
            onChange={handleInputChange}
          ></textarea>
          <div className="flex justify-center w-full mt-6 gap-4">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 relative bottom-3 bg-white color-letra botones rounded-3xl hover:bg-slate-700"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 relative bottom-3 color-button text-white botones rounded-3xl hover:bg-slate-700"
            >
              Continuar
            </button>
          </div>
        </form>
      </Modal>
  );
};

export default EditProfileModal;

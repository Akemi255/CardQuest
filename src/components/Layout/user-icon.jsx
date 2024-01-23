"use client";
import { useEffect, useState } from 'react';
import { getEmail } from "@/helpers/getEmail";
import { BiUser } from "react-icons/bi";

const UserIcon = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const email = getEmail();

  useEffect(() => {
    const fetchAvatar = async () => {
        try {
          if (email) {
           
            const storedAvatar = localStorage.getItem('userAvatar');
  
            if (storedAvatar) {
              setAvatarUrl(storedAvatar);
            } else {
              const response = await fetch('https://api-rest-card-quest.vercel.app/api/users/getAvatar', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
              });
  
              if (response.ok) {
                const data = await response.json();
  
                
                localStorage.setItem('userAvatar', data);
  
                setAvatarUrl(data);
              } else {
                console.error('Error en la solicitud:', response.statusText);
              }
            }
          }
        } catch (error) {
          console.error('Error obteniendo el avatar:', error.message);
        }
      };
  
      fetchAvatar();
    }, [email]);

  return (
    <>
      {avatarUrl ? (
        <img src={avatarUrl} alt="User Avatar"  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 object-cover" />
      ) : (
        <BiUser className="text-2xl sm:text-lg mr-1 sm:mr-1" />
      )}
    </>
  );
};

export default UserIcon;

import { useEffect, useState } from "react";

const ViewProfile = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({
      name: 'User',
      nick: 'undefined',
      emailAddress: '',
      image: 'https://via.placeholder.com/150',
      banner: 'https://via.placeholder.com/1200x250',
      bio: 'undefined',
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:3002/api/users/getProfileById/${user}`);
          if (!response.ok) {
            throw new Error('Error al obtener el perfil del usuario');
          }
          const userData = await response.json();
          setUserProfile(userData.user);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [user]);
  
    return (
      <>
  
        {!loading && (
          <div className="mx-auto w-5/5 mt-4 p-4 bg-gray-700 shadow-md rounded-md">
            {/* Profile Banner */}
            <div
              className="relative rounded-t-md"
              style={{
                backgroundImage: `url(${userProfile.banner})`,
                height: '250px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
              }}
            >
              {/* Profile Image */}
              <img
                src={userProfile.image}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute bottom-0 transform -translate-x-1/2 translate-y-1/2"
                style={{
                  left: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
            {/* User Info */}
            <div className="mt-10 p-4 flex flex-col items-center text-center">
              <h2 className="text-2xl text-white">{userProfile.name} </h2>
              <p className="text-gray-500">@{userProfile.nick}</p>
              <p className="mt-2 text-white">{userProfile.bio}</p>
            </div>
          </div>
        )}
      </>
    );
  };

export default ViewProfile
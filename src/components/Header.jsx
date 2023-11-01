import { BiUser } from 'react-icons/bi';

const Header = () => {
    return (
      <div className="bg-gray-700 text-white flex justify-between items-center">
        <div className="flex items-center sm:ml-20" >
          <button className="text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out">Borrar datos</button>
        </div>
  
        <div className="text-xl font-bold flex items-center justify-center lg:ml-0">
  <img
    src="/assets/logo.png"
    alt="logo"
    className="w-40 h-15 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
    
  />
</div>

  
        <div className="flex items-center sm:mr-20">
          <BiUser />
          <button className="text-lg font-bold hover:text-gray-300 relative transition duration-300 ease-in-out">Mi perfil</button>
        </div>
      </div>
    );
  };

export default Header;

import React from "react";
import '/public/css/footer.css';
const Footer = () => {
  return (
    <div className="bg-gray-700 text-white p-4 footerCont">
      <div className="container mx-auto flex justify-center items-center footer-text">
        &copy; 2023 CardQuest. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Footer;

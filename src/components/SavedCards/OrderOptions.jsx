import React, { useEffect, useRef } from "react";
import OrderOptionButton from "./OrderOptionButton";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const OrderOptions = ({ setGroupBy, showOrderOptions, setShowOrderOptions, selectedOption, setSelectedOption }) => {
  const orderOptions = [
    { label: "Recientes", value: "recientes" },
    { label: "Más antiguos", value: "masAntiguos" },
    { label: "Rareza", value: "rareza" },
  ];

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOrderOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, setShowOrderOptions]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="ml-5 order-options-button text-2xl font-bold text-white hover:text-gray-300 relative transition duration-300 ease-in-out cursor flex justify-center items-center"
        onClick={() => setShowOrderOptions(!showOrderOptions)}
      >
        Ordenar por &nbsp; <IoMdArrowDropdownCircle />
      </button>
      <div className={`order-options ${showOrderOptions ? 'block' : 'hidden'} absolute left-5 bg-gray-700 rounded-md overflow-hidden shadow-md z-50 transition duration-300 ease-in-out`} >
        {orderOptions.map((option) => (
          <OrderOptionButton
            key={option.value}
            label={option.label}
            value={option.value}
            selected={selectedOption}
            onClick={(value) => { setGroupBy(value); setSelectedOption(value); setShowOrderOptions(false); }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderOptions;

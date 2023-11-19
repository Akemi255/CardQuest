const OrderOptionButton = ({ label, value, selected, onClick }) => (
  <button className="grouping-button text-sm" onClick={() => onClick(value)}>
    <span
      className={`${
        selected === value
          ? "text-black hover:text-opacity-70 new-header-button"
          : "text-white hover:text-gray-300 header-button"
      }  relative transition duration-300 ease-in-out`}
    >
      {label}
    </span>
  </button>
);

export default OrderOptionButton;

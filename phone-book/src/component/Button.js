import React from "react";

const Button = ({ title }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
        {title}
      </button>
    </>
  );
};

export default Button;

import React from "react";

const Item = ({ item }) => {
  return (
    <div className="p-4 mt-4 mb-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="flex flex-row items-center gap-4">
        <div className="flex-shrink-0">
          <img
            alt="profil"
            src="https://www.tailwind-kit.com/images/person/1.jpg"
            className="object-cover w-16 h-16 mx-auto rounded-full "
          />
        </div>
        <div className="flex flex-col ">
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {item.name}
          </span>
          <span className="text-xs text-gray-400">{item.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;

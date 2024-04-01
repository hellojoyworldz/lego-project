import React from "react";

const InputText = (props) => {
  const name = props?.title?.split(" ").join("").toLowerCase();
  console.log(props.setInput);
  return (
    <div>
      {!props.titlehidden ? (
        <label htmlFor={`required-${name}`} className="text-gray-700">
          {props.title}
        </label>
      ) : (
        ""
      )}
      <input
        type="text"
        name={name}
        id={`required-${name}`}
        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder={props.instructions}
        onChange={props.setChange}
      />
    </div>
  );
};

export default InputText;

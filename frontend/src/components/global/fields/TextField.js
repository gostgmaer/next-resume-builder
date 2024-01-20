import React from "react";

const TextField = ({
  label,
  type,
  placeholder,
  additionalAttrs,
  value,
  onChange,
  classes,
  icon,
  id,
}) => {
  return (
    <div className=" flex flex-col w-full">
      <label className="block">
        {label && (
          <span className=" block text-sm capitalize font-semibold  mb-1.5">
            {label} :{" "}
          </span>
        )}
        <span
          className={`flex items-center peer  w-full transition duration-200  rounded-md bg-transparent focus:ring-[0.6px]  ${
            icon && "border border-gray-400 dark:border-gray-100 pl-3.5 h-10 leading-[40px]"
          }`}
        >
          {icon && <button className="  pr-1">{icon}</button>}
          <input
            className={` rounded w-full  leading-tight focus:outline-none  border border-gray-400 dark:border-gray-100 px-3.5 h-10  ${
              classes ? classes : ""
            }`}
            type={type}
            placeholder={placeholder}
            name={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            id={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            value={value}
            onChange={onChange}
            {...additionalAttrs}
          />
        </span>
      </label>
    </div>
  );
};

export default TextField;

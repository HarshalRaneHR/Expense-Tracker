import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                className="text-primary cursor-pointer"
                size={22}
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                className="text-slate-400 cursor-pointer"
                size={22}
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;

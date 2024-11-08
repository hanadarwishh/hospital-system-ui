// TextBox.js
import React from "react";
import "../../components/TextField/TextField.css";

const TextBox = ({ value, onChange, placeholder, style }) => {
  return (
    <input
      className=".text-field-style"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextBox;

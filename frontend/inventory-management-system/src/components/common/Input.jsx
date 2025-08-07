import React from "react";

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} className="border border-blue-500 p-2 rounded-xl" />
    </div>
  );
}

export default Input;

import React from "react";

function Button({ label, onClick, className, disabled, type = "button" }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded ${className}`}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;

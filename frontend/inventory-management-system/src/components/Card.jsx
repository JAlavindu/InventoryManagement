import React from "react";

function Card({ title, description, image }) {
  return (
    <div className="border rounded-lg border-hidden shadow-lg p-4 bg-white">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;

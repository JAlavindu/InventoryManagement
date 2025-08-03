import React, { useState } from "react";
import Button from "./Button";
import DeleteProduct from "../pages/DeleteProduct";
import Modal from "./Modal";

function Card({ title, description, image, ...props }) {
  const [open, setOpen] = useState(false);
  function openModel() {
    setOpen(true);
  }
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <DeleteProduct />
      </Modal>
      <div className="border rounded-lg border-hidden shadow-lg p-4 bg-white">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <div className="flex flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className=" flex justify-end space-x-2">
            {props.editButton && (
              <Button
                label="Edit"
                onClick={() => alert("Edit functionality not implemented yet")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
          mt-2"
              />
            )}
            {props.deleteButton && (
              <Button
                label="Delete"
                onClick={openModel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold mt-2 ml-2"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

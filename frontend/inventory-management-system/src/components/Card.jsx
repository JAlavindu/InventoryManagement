/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Button from "./Button";
import DeleteProduct from "../pages/DeleteProduct";
import Modal from "./Modal";
import ProductContext from "../store/product-context";
import { Link } from "react-router-dom";

function Card({ title, description, image, ...props }) {
  const { modalState, openModal, closeModal } = useContext(ProductContext);
  return (
    <>
      <Modal open={modalState} onClose={closeModal}>
        <DeleteProduct id={props.id} />
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
            <p className="text-gray-800 font-bold mt-2">
              Price: ${props.price}
            </p>
            <p className="text-gray-800 font-bold mt-2">
              Quantity: {props.quantity}
            </p>
          </div>

          <div className=" flex justify-end space-x-2">
            {props.editButton && (
              <Link
                to={`/edit-product/${props.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
          mt-2 px-4 py-2 rounded"
              >
                Edit
              </Link>
            )}
            {props.deleteButton && (
              <Button
                label="Delete"
                onClick={openModal}
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

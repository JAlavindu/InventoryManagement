/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import ProductContext from "../store/product-context";

function DeleteProduct() {
  const { modalState, openModal, closeModal } = useContext(ProductContext);
  function cancelProductDeletion() {
    // Logic to cancel product deletion
    closeModal();
    console.log(modalState);
    console.log("Product deletion cancelled");
  }

  function confirmProductDeletion() {
    // Logic to confirm product deletion
    closeModal();
    console.log(modalState);
    console.log("Product deleted successfully");
  }
  return (
    <div>
      <h1>Delete Product</h1>
      <Button
        label="cancel"
        onClick={cancelProductDeletion}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-2"
      />
      <Button
        label="confirm"
        onClick={confirmProductDeletion}
        className="bg-red-500 hover:bg-red-700 text-white font-bold mt-2 ml-2"
      />
    </div>
  );
}

export default DeleteProduct;

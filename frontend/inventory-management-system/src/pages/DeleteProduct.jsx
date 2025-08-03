/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "../components/Button";

function DeleteProduct() {
  function cancelProductDeletion() {
    // Logic to cancel product deletion
    console.log("Product deletion cancelled");
  }

  function confirmProductDeletion() {
    // Logic to confirm product deletion
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

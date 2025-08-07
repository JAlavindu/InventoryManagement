/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Button from "../../../components/common/Button";
import ProductContext from "../../../store/product-context";
import useAxios from "../../../hooks/useAxios";

function DeleteProduct({ id }) {
  const { modalState, openModal, closeModal } = useContext(ProductContext);
  const {
    data,
    loading,
    error,
    refetch: deleteProduct,
  } = useAxios({
    url: `http://localhost:8080/api/products/product/${id}`, // Replace with your API endpoint
    method: "DELETE",
    triggerOnMount: false,
    transform: (response) => response.data,
  });

  function cancelProductDeletion() {
    // Logic to cancel product deletion
    closeModal();
    console.log(modalState);
    console.log("Product deletion cancelled");
  }

  function confirmProductDeletion() {
    // Logic to confirm product deletion

    try {
      deleteProduct();
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      closeModal();
      console.log(modalState);
      window.location.reload();
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      <h1>Are you sure you want to delete this product?</h1>
      <div className="flex justify-center space-x-2">
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

      {/* {loading && <p>Deleting product...</p>}
      {error && (
        <p className="text-red-500">Error deleting product: {error.message}</p>
      )}
      {data && <p className="text-green-500">Product deleted successfully!</p>} */}
    </div>
  );
}

export default DeleteProduct;

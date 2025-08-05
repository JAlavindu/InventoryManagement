/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AddOrUpdateProductForm from "../components/addOrUpdateProductForm";
import ProductContext from "../store/product-context";
import { useParams } from "react-router-dom";

function EditProductsPage() {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const formData = new FormData();

  if (!products || products.length === 0) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="text-center p-8 text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="p-6 w-4/5 mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Edit Product</h1>
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
        <img src={product.imageUrl} alt={product.name} />
        <AddOrUpdateProductForm product={product} />
      </div>
    </div>
  );
}

export default EditProductsPage;

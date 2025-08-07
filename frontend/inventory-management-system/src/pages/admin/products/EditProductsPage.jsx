import React, { useContext, useEffect, useState } from "react";
import AddOrUpdateProductForm from "../../../components/admin/addOrUpdateProductForm";
import ProductContext from "../../../store/product-context";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import useAxios from "../../../hooks/useAxios";

function EditProductsPage() {
  const { products, refetchProducts } = useContext(ProductContext);
  const { id } = useParams();
  const [updateProduct, setUpdateProduct] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const formData = new FormData();

  const product = products?.find((p) => p.id.toString() === id);

  const updateProductRequest = useAxios({
    url: `http://localhost:8080/api/products/product/${id}`,
    method: "PUT",
    body: formData, // <-- will be passed when refetch is called
    headers: {
      "Content-Type": "multipart/form-data",
    },
    triggerOnMount: false, // so it only runs when refetch is called
  });

  useEffect(() => {
    if (product) {
      setUpdateProduct({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category: product.category || "",
      });
    }
  }, [product]);

  if (!products || products.length === 0) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  function handleUpdateChange(e) {
    setUpdateProduct({
      ...updateProduct,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdateImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setUpdateProduct((prev) => ({ ...prev, image: file }));
    }
  }

  function handleUpdateSubmit(e) {
    e.preventDefault();

    // Append product JSON as string
    const productJson = {
      name: updateProduct.name,
      description: updateProduct.description,
      price: updateProduct.price,
      quantity: updateProduct.quantity,
      category: updateProduct.category,
    };
    formData.append("product", JSON.stringify(productJson));

    // Append image file if exists
    if (updateProduct.image) {
      formData.append("imageFile", updateProduct.image);
    }

    setMessage("Product updated successfully!");
    updateProductRequest.refetch();
    refetchProducts(); // Refresh the product list after update
    navigate("/products");
  }

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
        {updateProduct ? (
          <AddOrUpdateProductForm
            handleChange={handleUpdateChange}
            handleImageChange={handleUpdateImageChange}
            product={updateProduct}
          />
        ) : (
          <p className="text-gray-500">Loading form data...</p>
        )}

        <Button
          label="Update Product"
          onClick={handleUpdateSubmit}
          className="mt-4"
        />
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default EditProductsPage;

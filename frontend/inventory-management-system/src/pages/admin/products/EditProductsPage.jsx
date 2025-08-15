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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Edit Product
          </h1>
          <div className="flex flex-col items-center gap-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-w-md rounded-xl border border-gray-100 shadow"
            />
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
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
            />
            {message && <p className="text-green-600 mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductsPage;

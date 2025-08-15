import { useState } from "react";
import Button from "../../../components/common/Button";
import useAxios from "../../../hooks/useAxios";
import AddOrUpdateProductForm from "../../../components/admin/addOrUpdateProductForm";
function AddProductsPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const formData = new FormData();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Append product JSON as string
    const productJson = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
    };
    formData.append("product", JSON.stringify(productJson));

    // Append image file
    if (product.image) {
      formData.append("imageFile", product.image);
    }
    setMessage("Product added successfully!");

    // Call useAxios manually (not on mount)
    addProductRequest.refetch();
  };

  const addProductRequest = useAxios({
    url: "http://localhost:8080/api/products",
    method: "POST",
    body: formData, // <-- will be passed when refetch is called
    headers: {
      "Content-Type": "multipart/form-data",
    },
    triggerOnMount: false, // so it only runs when refetch is called
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AddOrUpdateProductForm
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              product={product}
            />

            <div className="flex justify-center">
              <Button
                label="Add Product"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
              />
            </div>

            {message && (
              <p className="text-green-600 font-medium text-center">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductsPage;

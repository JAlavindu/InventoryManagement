import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import useAxios from "../hooks/useAxios";
import categories from "../utils/categories";
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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <Input
            id="description"
            label="Description"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="price"
              label="Price"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
              required
            />

            <Input
              id="quantity"
              label="Quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col  gap-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="border border-blue-500 p-2 rounded-xl"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-700" htmlFor="product-image">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="product-image"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {product.imagePreview && (
              <img
                src={product.imagePreview}
                alt="Preview"
                className="mt-3 h-32 w-32 object-cover border rounded"
              />
            )}
          </div>

          <div className="flex justify-center">
            <Button
              label="Add Product"
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
            />
          </div>

          {message && (
            <p className="text-green-600 font-medium text-center">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProductsPage;

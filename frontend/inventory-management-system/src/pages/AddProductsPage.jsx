import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function AddProductsPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Product added successfully!");
  };

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

          <Input
            id="category"
            label="Category"
            name="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
            required
          />

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

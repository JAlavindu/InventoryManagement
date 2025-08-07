import React from "react";
import Input from "../common/Input";
import categories from "../../utils/categories";

function AddOrUpdateProductForm({ handleChange, handleImageChange, product }) {
  return (
    <>
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
    </>
  );
}

export default AddOrUpdateProductForm;

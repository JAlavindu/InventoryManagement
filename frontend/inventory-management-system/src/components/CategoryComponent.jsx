import React, { useContext, useState } from "react";
import category from "../utils/categories";
import ProductContext from "../store/product-context";

function CategoryComponent() {
  const [activeCategory, setActiveCategory] = useState(category[0]);
  const { setCategoryHandler } = useContext(ProductContext);

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    setCategoryHandler(cat);
    console.log(`Category changed to: ${cat}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-wrap justify-center border-b border-gray-300">
        {category.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 text-sm font-medium 
              ${
                activeCategory === cat
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } transition-colors duration-200`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          Showing results for:{" "}
          <span className="font-semibold text-blue-600">{activeCategory}</span>
        </p>
      </div>
    </div>
  );
}

export default CategoryComponent;

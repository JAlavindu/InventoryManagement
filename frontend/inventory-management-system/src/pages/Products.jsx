import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Card from "../components/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        // Enhance each product with its image URL
        const updatedProducts = response.data.map((product) => ({
          ...product,
          imageUrl: `http://localhost:8080/api/products/${product.id}/image`,
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="p-6 w-4/5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                description={product.description}
                image={product.imageUrl}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Products;

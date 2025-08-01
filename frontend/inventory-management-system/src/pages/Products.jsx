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
        setProducts(response.data);
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                description={product.description}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Products;

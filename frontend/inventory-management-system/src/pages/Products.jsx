import { useCallback } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import useAxios from "../hooks/useAxios";

function Products() {
  // ✅ Memoize the transform function to prevent infinite loop
  const transformProducts = useCallback(
    (products) =>
      products.map((product) => ({
        ...product,
        imageUrl: `http://localhost:8080/api/products/${product.id}/image`,
      })),
    []
  );

  const {
    data: products = [],
    loading,
    error,
  } = useAxios({
    url: "http://localhost:8080/api/products",
    transform: transformProducts,
  });

  return (
    <>
      <NavBar />

      <div className="p-6 w-4/5 mx-auto min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

        {loading && (
          <p className="text-gray-500 text-center animate-pulse">
            Loading products...
          </p>
        )}

        {!loading && error && (
          <p className="text-red-500 text-center">
            {error.message || "Failed to load products."}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products available.</p>
        )}

        {!loading && !error && products.length > 0 && (
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

      <Footer />
    </>
  );
}

export default Products;

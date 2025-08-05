/* eslint-disable no-unused-vars */
import { useCallback, useContext } from "react";
import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import CategoryComponent from "../components/CategoryComponent";
import ProductContext from "../store/product-context";

function ProductsPage() {
  const { category, products, loading, error } = useContext(ProductContext);
  // ✅ Memoize the transform function to prevent infinite loop
  // const transformProducts = useCallback(
  //   (products) =>
  //     products.map((product) => ({
  //       ...product,
  //       imageUrl: `http://localhost:8080/api/products/${product.id}/image`,
  //     })),
  //   []
  // );

  // const {
  //   data: products = [],
  //   loading,
  //   error,
  // } = useAxios({
  //   url: "http://localhost:8080/api/products",
  //   transform: transformProducts,
  // });
  // function categoryFilter(category) {
  //     return products.filter((product) => product.category === category);
  //   }
  return (
    <>
      <div className="p-6 w-4/5 mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold mb-4 ">Products</h1>

          <Link
            to="/add-product"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-4 px-4 py-2 rounded"
          >
            Add Product
          </Link>
        </div>

        <div className="mb-6">
          <CategoryComponent />
        </div>

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
                editButton={true}
                deleteButton={true}
                id={product.id}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ProductsPage;

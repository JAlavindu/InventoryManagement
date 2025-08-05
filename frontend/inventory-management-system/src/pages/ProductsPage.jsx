/* eslint-disable no-unused-vars */
import { useCallback, useContext } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import CategoryComponent from "../components/CategoryComponent";
import ProductContext from "../store/product-context";

function ProductsPage() {
  const { products, loading, error, refetchProducts } =
    useContext(ProductContext);

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
                price={product.price}
                quantity={product.quantity}
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

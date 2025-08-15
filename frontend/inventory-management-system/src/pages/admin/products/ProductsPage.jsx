/* eslint-disable no-unused-vars */
import { useCallback, useContext } from "react";
import Card from "../../../components/common/Card";
import { Link } from "react-router-dom";
import CategoryComponent from "../../../components/CategoryComponent";
import ProductContext from "../../../store/product-context";

function ProductsPage() {
  const { products, loading, error, refetchProducts } =
    useContext(ProductContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Products
          </h1>
          <Link
            to="/add-product"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
          >
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <CategoryComponent />
        </div>

        {/* States */}
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
}

export default ProductsPage;

/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import ProductContext from "../../store/product-context";
import Card from "../../components/common/Card";
import CategoryComponent from "../../components/CategoryComponent";

function CustomerHomePage() {
  const { products, refetchProducts, loading, error } =
    useContext(ProductContext);
  console.log("CustomerHomePage render:", {
    products,
    productsLength: products?.length,
    loading,
    error,
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome to your Dashboard
            </h1>
            <p className="text-gray-600 text-sm">Browse our latest products</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <CategoryComponent />
        </div>

        {loading && (
          <div className="text-center text-gray-600 bg-white border border-gray-100 rounded-xl p-8">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl p-8">
            Error loading products: {error?.message || "Unknown error"}
          </div>
        )}

        {!loading && !error && products && products.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                description={product.description}
                image={product.imageUrl}
                price={product.price}
                quantity={product.quantity}
                addToCartButton={true}
                id={product.id}
              />
            ))}
          </ul>
        ) : (
          !loading &&
          !error && (
            <div className="text-center text-gray-600 bg-white border border-gray-100 rounded-xl p-8">
              No products available.
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CustomerHomePage;

/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import ProductContext from "../../store/product-context";
import Card from "../../components/common/Card";

function CustomerHomePage() {
  const { products, refetchProducts } = useContext(ProductContext);
  return (
    <>
      <div className="min-h-screen w-4/5 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to Customer Home Page
        </h1>

        {products && products.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          <p>No products available.</p>
        )}
      </div>
    </>
  );
}

export default CustomerHomePage;

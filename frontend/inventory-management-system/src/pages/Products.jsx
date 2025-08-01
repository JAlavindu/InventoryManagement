import React from "react";
import NavBar from "../components/NavBar";

function Products() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-4">
          Explore our range of inventory management products.
        </p>
      </div>
    </>
  );
}

export default Products;

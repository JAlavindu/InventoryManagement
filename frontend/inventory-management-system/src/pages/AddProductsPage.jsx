import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AddProductsPage() {
  return (
    <>
      <NavBar />
      <div className="h-min-screen p-6 w-4/5 mx-auto">
        <h1>Add New Product</h1>
        {/* Add your form or input fields here */}
      </div>
      <Footer />
    </>
  );
}

export default AddProductsPage;

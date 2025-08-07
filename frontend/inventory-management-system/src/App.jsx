import React from "react";
import { Router, RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import ProductsContextProvider from "./store/products-context-provider";

function App() {
  return (
    <ProductsContextProvider>
      <RouterProvider router={router} />
    </ProductsContextProvider>
  );
}

export default App;

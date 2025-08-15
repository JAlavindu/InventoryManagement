import React from "react";
import { RouterProvider } from "react-router-dom"; // Remove unused Router import
import router from "./routes/Router";
import ProductsContextProvider from "./store/products-context-provider";
import AuthProvider from "./store/auth-provider";

function App() {
  return (
    <AuthProvider>
      <ProductsContextProvider>
        <RouterProvider router={router} />
      </ProductsContextProvider>
    </AuthProvider>
  );
}

export default App;

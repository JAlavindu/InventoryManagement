import React from "react";
import { RouterProvider } from "react-router-dom"; // Remove unused Router import
import router from "./routes/Router";
import ProductsContextProvider from "./store/products-context-provider";
import { AuthProvider } from "./store/auth-provider";

function App() {
  return (
    <RouterProvider router={router}>
      <AuthProvider>
        <ProductsContextProvider>
          {/* The routed components will be rendered here based on the router configuration */}
        </ProductsContextProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;

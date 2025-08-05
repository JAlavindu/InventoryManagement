import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductsPage from "./pages/AddProductsPage";
import Root from "./pages/Root";
import EditProductsPage from "./pages/EditProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "add-product", element: <AddProductsPage /> },
      { path: "edit-product/:id", element: <EditProductsPage /> },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductsPage from "./pages/AddProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/add-product",
    element: <AddProductsPage />,
  },
]);

export default router;

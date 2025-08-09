import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProductsPage from "../pages/admin/products/ProductsPage";
import AddProductsPage from "../pages/admin/products/AddProductsPage";
import Root from "../pages/Root";
import EditProductsPage from "../pages/admin/products/EditProductsPage";
import CustomerHomePage from "../pages/customer/CustomerHomePage";
import SignUp from "../auth/SignUp";

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
  {
    path: "/customer",
    element: <Root />,
    children: [
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "",
        element: <CustomerHomePage />,
      },
    ],
  },
]);

export default router;

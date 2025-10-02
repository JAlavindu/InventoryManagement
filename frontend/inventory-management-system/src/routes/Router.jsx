import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProductsPage from "../pages/admin/products/ProductsPage";
import AddProductsPage from "../pages/admin/products/AddProductsPage";
import Root from "../pages/Root";
import EditProductsPage from "../pages/admin/products/EditProductsPage";
import CustomerHomePage from "../pages/customer/CustomerHomePage";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import CartPage from "../pages/customer/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <LandingPage /> },
      {
        path: "products",
        element: (
          <ProtectedRoute element={<ProductsPage />} requiredRole="ADMIN" />
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute element={<AddProductsPage />} requiredRole="ADMIN" />
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ProtectedRoute element={<EditProductsPage />} requiredRole="ADMIN" />
        ),
      },
    ],
  },
  {
    path: "/customer",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute
            element={<CustomerHomePage />}
            requiredRole="CUSTOMER"
          />
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute element={<CartPage />} requiredRole="CUSTOMER" />
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Root />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

export default router;

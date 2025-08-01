import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export default router;

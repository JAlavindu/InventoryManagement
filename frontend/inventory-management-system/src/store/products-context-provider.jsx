import { useCallback, useMemo, useReducer, useState } from "react";
import ProductContext from "./product-context";
import useAxios from "../hooks/useAxios";

function modalReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return true;
    case "CLOSE":
      return false;
    default:
      return state;
  }
}

export default function ProductsContextProvider({ children }) {
  const [modalState, dispatch] = useReducer(modalReducer, false);
  const [category, setCategory] = useState("all");

  const transformProducts = useCallback(
    (products) =>
      products.map((product) => ({
        ...product,
        imageUrl: `http://localhost:8080/api/products/${product.id}/image`,
      })),
    []
  );

  const {
    data: products = [],
    loading,
    error,
  } = useAxios({
    url: "http://localhost:8080/api/products",
    transform: transformProducts,
  });

  // ✅ Dynamically filter products based on category
  const filteredProducts = useMemo(() => {
    if (category.toLowerCase() === "all") return products;
    return products.filter((product) => product.category === category);
  }, [products, category]);

  const openModal = () => dispatch({ type: "OPEN" });
  const closeModal = () => dispatch({ type: "CLOSE" });
  const setCategoryHandler = (category) => setCategory(category);
  const ctxValue = {
    modalState,
    openModal,
    closeModal,
    setCategoryHandler,
    category,
    products: filteredProducts,
    loading,
    error,
  };
  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
}

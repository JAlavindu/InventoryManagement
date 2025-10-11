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

  const transformProducts = useCallback((response) => {
    // Handle different response formats
    const products = Array.isArray(response)
      ? response
      : response?.data || response?.products || [];

    console.log("Fetched products:", products);

    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }

    return products.map((product) => ({
      ...product,
      imageUrl: `/api/products/${product.id}/image`,
    }));
  }, []);

  const {
    data: products = [],
    loading,
    error,
    refetch,
  } = useAxios({
    url: "/api/products",
    withCredentials: true,
    transform: transformProducts,
  });

  console.log("ProductsContextProvider state:", {
    products,
    loading,
    error,
    productsLength: products?.length,
  });

  // ✅ Dynamically filter products based on category
  const filteredProducts = useMemo(() => {
    console.log("Filtering products:", {
      category,
      productsCount: products?.length,
    });
    if (category.toLowerCase() === "all") return products;
    const filtered = products.filter(
      (product) => product.category === category
    );
    console.log("Filtered products:", { filteredCount: filtered.length });
    return filtered;
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
    refetchProducts: refetch,
  };
  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
}

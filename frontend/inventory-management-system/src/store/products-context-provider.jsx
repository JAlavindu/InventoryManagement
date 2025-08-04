import { useReducer } from "react";
import ProductContext from "./product-context";

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

function setCategoryReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.category;
    default:
      return state;
  }
}

export default function ProductsContextProvider({ children }) {
  const [modalState, dispatch] = useReducer(modalReducer, false);
  const [category, categoryDispatch] = useReducer(setCategoryReducer, "");

  const openModal = () => dispatch({ type: "OPEN" });
  const closeModal = () => dispatch({ type: "CLOSE" });
  const setCategoryHandler = (category) =>
    categoryDispatch({ type: "SET_CATEGORY", category });
  const ctxValue = {
    modalState,
    openModal,
    closeModal,
    setCategoryHandler,
    category,
  };
  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
}

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

export default function ProductsContextProvider({ children }) {
  const [modalState, dispatch] = useReducer(modalReducer, false);

  const openModal = () => dispatch({ type: "OPEN" });
  const closeModal = () => dispatch({ type: "CLOSE" });
  const ctxValue = {
    modalState,
    openModal,
    closeModal,
  };
  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
}

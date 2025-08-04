import { createContext } from "react";

// Create and export context only
const ProductContext = createContext({
  modalState: false,
  category: "",
  openModal: () => {},
  closeModal: () => {},
  setCategory: () => {},
});

export default ProductContext;

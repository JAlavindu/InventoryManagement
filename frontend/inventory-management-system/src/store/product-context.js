import { createContext } from "react";

// Create and export context only
const ProductContext = createContext({
  modalState: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ProductContext;

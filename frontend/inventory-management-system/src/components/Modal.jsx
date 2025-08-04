import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="p-0 border-none bg-transparent"
    >
      {/* Modal backdrop & positioning */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Modal;

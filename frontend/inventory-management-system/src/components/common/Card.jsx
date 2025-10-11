// /* eslint-disable no-unused-vars */
// import React, { useContext, useState } from "react";
// import Button from "./Button";
// import DeleteProduct from "../../pages/admin/products/DeleteProduct";
// import Modal from "./Modal";
// import ProductContext from "../../store/product-context";
// import { Link } from "react-router-dom";

// function Card({ title, description, image, ...props }) {
//   const { modalState, openModal, closeModal } = useContext(ProductContext);
//   return (
//     <>
//       <Modal open={modalState} onClose={closeModal}>
//         <DeleteProduct id={props.id} />
//       </Modal>
//       <div className="border rounded-lg border-hidden shadow-lg p-4 bg-white">
//         {image && (
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-48 object-cover rounded-md mb-4"
//           />
//         )}
//         <div className="flex flex-row gap-4 items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">{title}</h3>
//             <p className="text-gray-600">{description}</p>
//             {props.price && (
//               <p className="text-gray-800 font-bold mt-2">
//                 Price: ${props.price}
//               </p>
//             )}
//             {
//               <p className="text-gray-800 font-bold mt-2">
//                 Quantity: {props.quantity}
//               </p>
//             }
//           </div>

//           <div className=" flex justify-end space-x-2">
//             {props.editButton && (
//               <Link
//                 to={`/edit-product/${props.id}`}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold
//           mt-2 px-4 py-2 rounded"
//               >
//                 Edit
//               </Link>
//             )}
//             {props.deleteButton && (
//               <Button
//                 label="Delete"
//                 onClick={openModal}
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold mt-2 ml-2"
//               />
//             )}
//             {props.addToCartButton && (
//               <Button
//                 label="Add to Cart"
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold mt-2 ml-2"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;

import React, { useContext, useState } from "react";
import Button from "./Button";
import DeleteProduct from "../../pages/admin/products/DeleteProduct";
import Modal from "./Modal";
import ProductContext from "../../store/product-context";
import AuthContext from "../../store/auth-context";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

function Card({ title, description, image, ...props }) {
  const { modalState, openModal, closeModal } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const { refetch: addToCartRequest } = useAxios({
    url: user?.userId ? `/api/cart/${user.userId}/add` : null,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    triggerOnMount: false,
  });

  async function addToCart() {
    if (!user?.userId) {
      setCartMessage("Please log in to add items to cart");
      return;
    }

    setAddingToCart(true);
    setCartMessage("");

    try {
      const payload = {
        productId: props.id,
        quantity: 1,
      };

      console.log("Adding to cart:", { userId: user.userId, payload });

      await addToCartRequest({
        data: payload,
      });
      setCartMessage("Added to cart successfully!");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      console.error("Add to cart error:", err);
      console.error("Error response:", err?.response);

      const errorMsg = err?.response?.data;
      const errorText =
        typeof errorMsg === "string"
          ? errorMsg
          : errorMsg?.message ||
            `Failed to add to cart: ${
              err?.response?.status || "Unknown error"
            }`;
      setCartMessage(errorText);
      setTimeout(() => setCartMessage(""), 3000);
    } finally {
      setAddingToCart(false);
    }
  }

  return (
    <>
      <Modal open={modalState} onClose={closeModal}>
        <DeleteProduct id={props.id} />
      </Modal>

      <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 overflow-hidden">
        {/* Image Section */}
        {image && (
          <div className="relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-col gap-4 items-start justify-between">
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {description}
              </p>

              {/* Price and Quantity Info */}
              <div className="space-y-2">
                {props.price && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-16">
                      Price:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ${props.price}
                    </span>
                  </div>
                )}
                {props.quantity && (
                  <div className="flex items-center ">
                    <span className="text-sm font-medium text-gray-500 w-16">
                      Stock:
                    </span>
                    <span
                      className={`font-semibold ${
                        props.quantity > 10
                          ? "text-green-600"
                          : props.quantity > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {props.quantity} units
                    </span>
                    {props.quantity <= 5 && props.quantity > 0 && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Low Stock
                      </span>
                    )}
                    {props.quantity === 0 && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 w-full lg:w-auto">
              {props.editButton && (
                <Link
                  to={`/edit-product/${props.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Link>
              )}

              {props.deleteButton && (
                <Button
                  label={
                    <span className="inline-flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </span>
                  }
                  onClick={openModal}
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                />
              )}

              {props.addToCartButton && (
                <>
                  <Button
                    label={
                      <span className="inline-flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 11-4 0v-5m4 0V9a2 2 0 00-4 0v4.01"
                          />
                        </svg>
                        {addingToCart ? "Adding..." : "Add to Cart"}
                      </span>
                    }
                    className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={props.quantity === 0 || addingToCart}
                    onClick={addToCart}
                  />
                  {cartMessage && (
                    <div
                      className={`mt-2 text-xs px-3 py-1.5 rounded ${
                        String(cartMessage).includes("success")
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {cartMessage}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Hover Effect Bar */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

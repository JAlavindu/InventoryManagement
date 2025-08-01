import React from "react";

function Footer() {
  return (
    <div>
      <div className="flex flex-row justify-around items-center bg-gray-800 text-white p-4">
        <p>&copy; 2023 Inventory Management System. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

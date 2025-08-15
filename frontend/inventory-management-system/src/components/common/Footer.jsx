import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <span className="text-gray-900 font-semibold">
              Inventory Management
            </span>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Inventory Management System. All
            rights reserved.
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

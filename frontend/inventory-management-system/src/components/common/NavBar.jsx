import React, { useContext } from "react";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, handleLogout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm"></div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Inventory Management
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">
                  Hi{user?.username ? `, ${user.username}` : ""}
                </span>
                <NavLink
                  to="/customer"
                  className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </NavLink>
                <Button
                  onClick={handleLogout}
                  label="Logout"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all"
                />
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/auth/login")}
                  label="Login"
                  className="bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 rounded-lg transition-all"
                />
                <Button
                  onClick={() => navigate("/auth/signup")}
                  label="Sign Up"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;

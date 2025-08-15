import React, { useContext } from "react";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, handleLogout } = useContext(AuthContext);

  return (
    <div className="flex flex-row justify-between items-center bg-gray-800 text-white p-4">
      <Link to="/" className="text-xl font-bold">
        Inventory Management System
      </Link>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <span className="mr-2">Hi{user?.username ? `, ${user.username}` : ""}</span>
            <NavLink to="/customer" className="text-white hover:text-gray-300">
              Dashboard
            </NavLink>
            <Button
              onClick={handleLogout}
              label="Logout"
              className="bg-red-500 hover:bg-red-700 text-white font-bold"
            />
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/auth/signup")}
              label="Sign Up"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
            />
            <Button
              onClick={() => navigate("/auth/login")}
              label="Login"
              className="bg-green-500 hover:bg-green-700 text-white font-bold"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;

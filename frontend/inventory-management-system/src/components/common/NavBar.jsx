import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [clickedSignup, setClickedSignup] = useState(false);

  const handleSignUp = () => {
    setClickedSignup(true);
    navigate("/products");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center bg-gray-800 text-white p-4">
      <Link to="/" className="text-xl font-bold">
        Inventory Management System
      </Link>
      <div className="flex space-x-4">
        {clickedSignup ? (
          <h1>info</h1>
        ) : (
          <>
            <Button
              onClick={handleSignUp}
              label="Sign Up"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
            />
            <Button
              onClick={handleLogin}
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

import React from "react";
import Button from "./Button";

function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Inventory Management System</h1>
      <div className="flex space-x-4">
        <Button
          label="Sign Up"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
        />
        <Button
          label="Login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold"
        />
      </div>
    </div>
  );
}

export default NavBar;

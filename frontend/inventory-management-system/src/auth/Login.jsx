// src/auth/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate("/customer");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen mx-auto w-4/5">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button
          type="submit"
          label="Login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
        <a href="http://localhost:8080/oauth2/authorization/google">
          <Button
            label="Login with Google"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          />
        </a>
      </form>
    </div>
  );
}

// src/auth/Login.jsx
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin({ username, password });
  }

  useEffect(() => {
    if (isAuthenticated) {
      const to = location.state?.from?.pathname || "/customer";
      navigate(to, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state?.from?.pathname]);
  return (
    <div className="min-h-screen mx-auto w-4/5">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
      >
        <h2>Login</h2>
        {loading && <p>Loading...</p>} {/* Show loading state if applicable */}
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
          label={loading ? "Logging in..." : "Login"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable button while loading
        />
        <a href="/oauth2/authorization/google">
          <Button
            label="Login with Google"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          />
        </a>
      </form>
    </div>
  );
}

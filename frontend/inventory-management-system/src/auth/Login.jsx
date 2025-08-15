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
    <div className="min-h-[calc(100vh-64px-72px)] bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10 blur-xl" />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl p-8 space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back
              </h2>
              <p className="text-gray-600 text-sm">
                Sign in to continue to your dashboard
              </p>
            </div>

            {loading && (
              <div className="text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm">
                Authenticating...
              </div>
            )}

            <div className="space-y-4">
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
            </div>

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                label={loading ? "Logging in..." : "Login"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
                disabled={loading}
              />
              <a href="/oauth2/authorization/google" className="block">
                <Button
                  label="Login with Google"
                  className="w-full bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 rounded-lg transition-all"
                />
              </a>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

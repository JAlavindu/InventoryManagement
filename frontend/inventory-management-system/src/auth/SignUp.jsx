// src/auth/SignUp.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, email, password });
      alert("Signup successful!");
      // After signup we auto-login in provider, go to customer
      navigate("/customer", { replace: true });
    } catch (err) {
      const msg = err?.response?.data || err?.message || "Signup failed";
      alert(msg);
    }
  };

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
                Create your account
              </h2>
              <p className="text-gray-600 text-sm">
                Start managing your inventory in minutes
              </p>
            </div>

            <div className="space-y-4">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                label="Sign Up"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow hover:shadow-blue-500/25 transition-all"
              />
              <p className="text-xs text-gray-500 text-center">
                By signing up, you agree to our Terms and Privacy Policy.
              </p>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

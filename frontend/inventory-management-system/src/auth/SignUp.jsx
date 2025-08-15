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
    <div className="w-4/5 min-h-screen mx-auto">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
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
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          label="Sign Up"
        />
      </form>
    </div>
  );
}

// import React, { useContext, useEffect, useState } from "react";
// import useAxios from "../hooks/useAxios";
// import AuthContext from "../store/auth-context";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const { login, logout, user, isAuthenticated, token } = useContext(AuthContext);

//   // Setup useAxios for the registration request (manual trigger)
//   const { data, loading, error, refetch } = useAxios({
//     url: "http://localhost:8080/api/users/register",
//     method: "POST",
//     body: {
//       username: formData.username,
//       email: formData.email,
//       password: formData.password,
//     },
//     headers: { "Content-Type": "application/json" },
//     triggerOnMount: false,
//   });

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     // Basic client-side validation
//     if (!formData.username || !formData.email || !formData.password) {
//       setErrorMsg("All fields are required.");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setErrorMsg("Passwords do not match.");
//       return;
//     }
//     if (formData.password.length < 6) {
//       setErrorMsg("Password must be at least 6 characters.");
//       return;
//     }

//     // Trigger API call via hook
//     await refetch();
//   }

//   // React to successful registration
//   useEffect(() => {
//     if (!loading && data) {
//       setSuccessMsg("Registration successful! You can now log in.");
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [data, loading]);

//   // React to error states from the hook
//   useEffect(() => {
//     if (!loading && error) {
//       if (error.response && error.response.status === 409) {
//         setErrorMsg(error.response.data);
//       } else {
//         setErrorMsg("Something went wrong. Please try again.");
//       }
//     }
//   }, [error, loading]);

//   return (
//     <div className="p-6 min-h-screen w-4/5">
//       <h1>Register</h1>

//       {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
//       {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <br />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password (min 6 chars)"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <br />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;

// src/auth/SignUp.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      alert("Signup successful! Please login.");
      navigate("/customer");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

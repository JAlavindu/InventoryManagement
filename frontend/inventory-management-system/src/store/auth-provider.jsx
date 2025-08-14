import { useState, useEffect } from "react";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Session check failed", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");

    const userRes = await fetch("http://localhost:8080/api/users/me", {
      credentials: "include",
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  const signup = async (username, email, password) => {
    const res = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error(await res.text());

    const userRes = await fetch("http://localhost:8080/api/users/me", {
      credentials: "include",
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

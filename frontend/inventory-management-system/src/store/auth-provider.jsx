// src/store/auth-provider.jsx
import { useEffect, useReducer } from "react";
import AuthContext from "./auth-context";
import useAxios from "../hooks/useAxios";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: null,
  });

  // Check session (/me)
  const {
    data: sessionData,
    loading: sessionLoading,
    refetch: refetchSession,
  } = useAxios({
    url: "/api/users/me",
    method: "GET",
    withCredentials: true,
    triggerOnMount: true,
  });

  useEffect(() => {
    if (sessionData?.role) {
      console.log("Session data updated:", sessionData);
      dispatch({ type: "LOGIN", payload: sessionData });
    } else if (sessionData === null && !sessionLoading) {
      console.log("No session data, setting unauthenticated");
      dispatch({ type: "LOGOUT" });
    }
  }, [sessionData, sessionLoading]);

  // Login
  const { refetch: loginRequest } = useAxios({
    url: "/api/users/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    triggerOnMount: false,
  });

  async function handleLogin(credentials) {
    try {
      console.log("Attempting login with credentials:", credentials);
      const response = await loginRequest({
        data: credentials, // { username, password }
      });

      console.log("Login response:", response);

      // Handle response based on structure
      if (response.data && response.data.user) {
        const userData = response.data.user;
        console.log("User data from login response:", userData);
        dispatch({ type: "LOGIN", payload: userData });
      } else if (!response.error) {
        // If no user data but no error, assume JWT is set, refetch session
        console.log("No user data in login response, refetching session...");
        await refetchSession();
      } else {
        console.error("Login failed due to error in response:", response.error);
        throw new Error("Invalid credentials or server error");
      }
    } catch (err) {
      console.error("Login failed", err);
      throw err; // Re-throw to be caught by the caller
    }
  }

  // Logout
  const { refetch: logoutRequest } = useAxios({
    url: "/api/users/logout",
    method: "POST",
    withCredentials: true,
    triggerOnMount: false,
  });

  async function handleLogout() {
    try {
      console.log("Attempting logout");
      await logoutRequest();
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  // Signup (register) then auto-login
  const { refetch: registerRequest } = useAxios({
    url: "/api/users/register",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    triggerOnMount: false,
  });

  async function handleSignup({ username, email, password }) {
    // Backend lowercases username/email; send as provided
    await registerRequest({ data: { username, email, password } });
    // Auto-login to set JWT cookie, then session will populate
    await handleLogin({ username, password });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: sessionLoading,
        handleLogin,
        handleLogout,
        signup: handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

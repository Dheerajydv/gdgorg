// src/pages/AuthCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      navigate("/"); // Redirect to the dashboard or homepage
    } else {
      navigate("/auth"); // Redirect back to login if token is missing
    }
  }, [login, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;

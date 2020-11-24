import React from "react";
import LoginForm from "../components/LoginForm";

// Page for logging in
function Login({ LoginFunction }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm LoginFunction={LoginFunction} />
    </div>
  );
}

export default Login;

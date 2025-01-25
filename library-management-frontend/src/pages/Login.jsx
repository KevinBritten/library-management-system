import { useState } from "react";

import axiosInstance from "../api/axiosInstance.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/user/login", { username, password })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Login/Signup</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

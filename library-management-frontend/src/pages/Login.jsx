import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance
        .post("/user/login", { username, password })
        .then((res) => setUser(res.data.user));
      navigate("/catalog");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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

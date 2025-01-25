import { useState } from "react";

import axiosInstance from "../api/axiosInstance.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const signup = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/user/signup", { username, password, role })
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
          <label>Select Role:</label>
          <div>
            <input
              type="radio"
              id="employee"
              name="role"
              value="employee"
              checked={role === "employee"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="employee">Employee</label>
          </div>
          <div>
            <input
              type="radio"
              id="owner"
              name="role"
              value="owner"
              checked={role === "owner"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="owner">Owner</label>
          </div>
        </div>
        <div>
          <button type="submit" onClick={signup}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

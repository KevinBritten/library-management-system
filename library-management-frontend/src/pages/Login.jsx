import axiosInstance from "../api/axiosInstance.js";

function Login() {
  const login = async () => {
    await axiosInstance
      .post("/user/login", { username: "test2", password: "123" })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Login/Signup</h1>
      <button onClick={login}>login</button>
    </div>
  );
}

export default Login;

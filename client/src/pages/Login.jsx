import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      alert("Login Success");

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        err.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          navigate("/register")
        }
      >
        Create Account
      </button>
    </div>
  );
}

export default Login;
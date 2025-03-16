import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./log-in.css";
import downloadImg from "./images/download.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validEmail = "admin@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container"> {/* Scoped Styles Here */}
      <div className="login-box">
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p>Please log in to continue</p>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>

          <p><a href="#">Forgot Password?</a></p>
        </div>

        <div className="login-image">
          <img src={downloadImg} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;

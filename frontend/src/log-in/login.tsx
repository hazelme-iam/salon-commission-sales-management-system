import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./log-in.css";
import downloadImg from "./images/download.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Use React Router navigation

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Simulated login check (replace this with real authentication logic)
    const validEmail = "admin@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      // Store login status in local storage
      localStorage.setItem("isAuthenticated", "true");

      // ✅ Use navigate instead of window.location.href
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
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

        {/* Right side - Image */}
        <div className="login-image">
          <img src={downloadImg} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;

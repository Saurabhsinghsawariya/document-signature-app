import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "Login failed");
  } else {
    alert("Login failed");
  }
}
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 dark:bg-blue-900 transition-colors duration-500">
      <form onSubmit={handleLogin} className="bg-blue-800 dark:bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-500">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">🔐 Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-blue-600 rounded bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-blue-600 rounded bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition-colors duration-300" type="submit">
          Login
        </button>
        <p className="text-sm mt-4 text-center text-blue-200">
          Don’t have an account? <a href="/register" className="text-blue-400 hover:text-blue-300">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

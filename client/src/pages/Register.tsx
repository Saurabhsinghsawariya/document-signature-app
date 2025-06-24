import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Registered successfully!");
      navigate("/");
    } 
    catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "Registration failed");
  } else {
    alert("Registration failed");
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-800 transition-colors duration-300">
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">📝 Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded w-full" type="submit">
          Register
        </button>
        <p className="text-sm mt-4 text-center text-gray-900 dark:text-gray-100">
          Already have an account? <a href="/login" className="text-green-600 dark:text-green-400">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;

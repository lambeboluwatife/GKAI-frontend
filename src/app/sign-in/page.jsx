"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Alert from "../components/Alert";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { email, password } = formData;
      const response = await axios.post(
        "https://gkai-fullstack.onrender.com/api/auth/login",
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      localStorage.setItem("userId", decodedToken?.user._id);

      document.cookie = `token=${token}; path=/`;

      setAlert({ type: "success", message: "Signed In!" });

      setFormData({ email: "", password: "" });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "danger",
        message: `Signing in failed: ${
          error.response?.data.message || "An error occurred"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign In</h2>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          autoDismiss
          duration={3000}
        />
      )}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {loading ? <h6>Signing in...</h6> : <h6>Sign In</h6>}
        </button>
        <p className="mt-3 text-center">
          Don’t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

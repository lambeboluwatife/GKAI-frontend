"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("verifyPassword", formData.verifyPassword);
      data.append("profilePicture", formData.profilePicture);

      const response = await axios.post(
        "https://gkai-fullstack.onrender.com/api/auth/register",
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      setAlert({ type: "success", message: "Account Created!" });

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
        profilePicture: null,
      });
      setPreviewImage(null);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: `Failed To Create Account: ${
          error.response?.data.error || "An error occurred"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="verifyPassword" className="form-label">
            VerifyPassword
          </label>
          <input
            type="password"
            className="form-control"
            id="verifyPassword"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {previewImage && (
          <div className="mb-3 text-center">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="img-thumbnail"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {loading ? <h6>creating account...</h6> : <h6>Sign Up</h6>}
        </button>
        <p className="mt-3 text-center">
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;

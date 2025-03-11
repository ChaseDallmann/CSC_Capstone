"use client"; // Make this a client component

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipcode: parseInt(formData.zipcode),
          password: formData.password,
          role: "USER_USER"
        }),
      });

      const data = await response.text();

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        router.push("/login"); // Redirect to login page
      } else {
        setError(data || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-10 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.zipcode}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

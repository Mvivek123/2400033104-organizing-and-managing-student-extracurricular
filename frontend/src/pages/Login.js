import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setError('Captcha does not match. Please try again.');
      setCaptchaInput('');
      setCaptchaCode(generateCaptcha());
      return;
    }

    const payload = {
      username: username.trim(),
      password: password.trim()
    };

    console.log("📤 REQUEST:", payload);

    try {
      // ✅ IMPORTANT: correct endpoint
      const response = await API.post('/login', payload);

      console.log("✅ RESPONSE:", response.data);

      // ✅ Proper validation
      if (response.status === 200 && response.data?.user) {

        // Save user in context
        auth.setUser(response.data.user);

        alert("Login success ✅");

        navigate('/'); // redirect to home

      } else {
        setError("Login failed");
      }

    } catch (err) {
      console.log("❌ ERROR:", err);

      // ✅ Better error handling
      if (err.response) {
        // Backend responded
        setError(err.response.data?.error || "Invalid credentials");
      } else if (err.request) {
        // Request sent but no response
        setError("Server not reachable ❌");
      } else {
        // Other error
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Captcha</label>
          <div className="flex gap-2 items-center mb-2">
            <div className="flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded text-center tracking-widest text-lg font-bold">
              {captchaCode}
            </div>
            <button
              type="button"
              onClick={() => setCaptchaCode(generateCaptcha())}
              className="text-sm text-indigo-600 hover:underline"
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter captcha code"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });

    // ✅ Validate confirm password match
    if (name === "confirmPassword") {
      if (value !== user.password) {
        setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }

    // ✅ Fixed: Use newUser, not user
    if (name === "confirm_password") {
      if (value !== newUser.password) {
        setErrors({ ...errors, confirm_password: "Passwords don't match" });
      } else {
        setErrors({ ...errors, confirm_password: "" });
      }
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    // ✅ Check if passwords match before Firebase call
    if (newUser.password !== newUser.confirm_password) {
      setErrors({ confirm_password: "Passwords don't match" });
      return;
    }

    setLoading(true);
    setErrors({});
    navigate("/login");

    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password,
      );
      console.log("User created successfully!");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use." });
      } else if (err.code === "auth/weak-password") {
        setErrors({ password: "Password should be atleast 6 characters." });
      } else {
        setErrors({ email: "Signup failed. Try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-tangerine rounded-2xl mx-auto mb-4 shadow-xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v4a2 2 0 012 2v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 00-1-1H6a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a2 2 0 012-2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        </div>

        <form
          onSubmit={signup}
          className="space-y-6 bg-white backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-2xl"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={newUser.email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white shadow-sm transition-all duration-200"
              placeholder="Enter your email"
              disabled={loading}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={newUser.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white shadow-sm transition-all duration-200"
              disabled={loading}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={newUser.confirm_password}
              name="confirm_password"
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white shadow-sm transition-all duration-200"
              disabled={loading}
              required
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password}
              </p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-light-tangerine hover:bg-tangerine py-4 px-8 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-gray-700 hover:text-black"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

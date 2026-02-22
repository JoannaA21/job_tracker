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
          <div className="w-50 h-50 flex items-center justify-center rounded-full shadow-2xl overflow-hidden mx-auto mb-4">
            <img
              src="/logo.png"
              alt="Job Tracker Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Job Tracker</h1>
          <p className="text-gray-500">Create Account</p>
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

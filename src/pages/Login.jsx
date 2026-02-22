import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      console.log("Login successfully!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrors({ email: "No user found with this email." });
      } else if (err.code === "auth/wrong-password") {
        setErrors({ password: "Incorrect password" });
      } else {
        setErrors({ email: "Login failed. Please Try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Successful login");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        console.log("User closed popup - normal behavior");
        return; // Don't treat as error
      }
      console.error("Error logging in with google", err);
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
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form
          onSubmit={login}
          className="space-y-6 bg-white backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-2xl"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
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
              value={user.password}
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

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-light-tangerine hover:bg-tangerine py-4 px-8 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="bg-white hover:bg-black hover:text-white border-2 border-gray-300 py-4 px-8 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Sign In with Google
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account yet?{" "}
          <a
            href="/signup"
            className="font-semibold text-gray-700 hover:text-black"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

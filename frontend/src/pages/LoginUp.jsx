import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, MessageCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import AuthImage from "../components/AuthImage";

const Login = () => {
  const { theme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-full md:w-3/5 animate-fade-in">
        <div className="w-full md:w-1/2 p-8">
          <div className="flex flex-col justify-center items-center mb-6">
            <div className="text-6xl text-primary animate-bounce">
              <MessageCircle />
            </div>
            <h2 className="text-3xl font-semibold text-primary mt-4">
              Create Account
            </h2>
            <p className="text-neutral mt-2">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label">
                <span className="label-text text-gray-400">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-gray-700 text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="label">
                <span className="label-text text-gray-400">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-gray-700 text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" />
                  ) : (
                    <Eye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-center">
            Not Yet Registered?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <AuthImage
          title="Welcome Back"
          subTitle="Sign in to continue your conversations and catch up with your messages"
        />
      </div>
    </div>
  );
};

export default Login;

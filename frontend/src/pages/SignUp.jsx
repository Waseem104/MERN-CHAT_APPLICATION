import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import AuthImage from "../components/AuthImage";

const SignUp = () => {
  const { theme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
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
            <p className="text-neutral mt-2">
              Get started with your free account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label">
                <span className="label-text text-gray-400">Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-gray-700 text-white"
                  placeholder="Enter your name"
                />
              </div>
            </div>
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-secondary mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-neutral hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <AuthImage
          title="Join the Community"
          subTitle="Connect with your friends and family"
        />
      </div>
    </div>
  );
};

export default SignUp;

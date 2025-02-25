import { Link } from "react-router-dom";
import { User, Settings, LogOut, Menu, MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <div className="text-2xl font-bold">Chatify</div>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
            <User className="mr-1" />
            Home
          </Link>
          <Link to="/profile" className="btn btn-ghost btn-sm rounded-btn">
            <User className="mr-1" />
            Profile
          </Link>
          <Link to="/settings" className="btn btn-ghost btn-sm rounded-btn">
            <Settings className="mr-1" />
            Settings
          </Link>
          <button onClick={logout} className="btn btn-ghost btn-sm rounded-btn">
            <LogOut className="mr-1" />
            Logout
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Menu className="w-5 h-5" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 hover:bg-base-200"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center p-2 hover:bg-base-200"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center p-2 w-full text-left hover:bg-base-200 text-error"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

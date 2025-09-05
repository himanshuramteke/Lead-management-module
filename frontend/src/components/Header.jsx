import { Link } from "react-router";
import { PlusCircle, LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      <Link to="/" className="text-xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
        LeadManager
      </Link>
      <nav className="space-x-6 flex items-center">
        <Link
          to="/create-lead"
          className="flex items-center space-x-1 text-orange-400 hover:text-orange-300"
        >
          <PlusCircle size={18} />
          <span>Create Lead</span>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center space-x-1 text-orange-400 hover:text-orange-300"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

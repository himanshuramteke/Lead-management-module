import { Link } from "react-router";
import { PlusCircle, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        Manage Your Leads{" "}
        <span className="text-orange-500">Effortlessly</span>
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl mb-8">
        Capture, track, and manage your business leads in one simple
        dashboard. Stay on top of every opportunity and never miss a deal.
      </p>
      <div className="flex gap-4">
        <Link
          to="/create-lead"
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          <PlusCircle className="w-5 h-5" /> Create Lead
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          <Users className="w-5 h-5" /> Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

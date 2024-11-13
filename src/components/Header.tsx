import { Button } from "@/components/ui/button"; // Adjust the path as per your project structure
import { Input } from "@/components/ui/input"; // Adjust the path as per your project structure
import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-purple-600"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold text-gray-900">DiscreteLearn</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Input type="search" placeholder="Search..." className="w-64" />
          <nav className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>

            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

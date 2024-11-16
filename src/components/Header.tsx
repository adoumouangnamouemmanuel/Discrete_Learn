import { Input } from "@/components/ui/input";
import { signOut } from "firebase/auth"; // Firebase auth methods
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHeader from "./headers/NavHeader";
import ProfileHeader from "@/pages/profiles/ProfileHeader";
import { isAuth } from "@/utils/authUtils"; // Import the utility function
import { auth } from "@/firebase/firebaseConfig"; // Firebase auth instance

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(
    null
  );

  // Fetch authentication state using isAuth
  useEffect(() => {
    isAuth().then(({ isLoggedIn, user }) => {
      setIsLoggedIn(isLoggedIn);
      setUser(user);
    });
  }, []);

  // Handle logout
  const handleLogout = () => {
    signOut(auth) // Sign out the user from Firebase
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

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
          {/* Search Input */}
          <Input type="search" placeholder="Search..." className="w-64" />

          {/* Navigation and Auth buttons */}
          <nav className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <NavHeader />
            ) : (
              <>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Link>
                <ProfileHeader user={user} loggedOut={handleLogout} />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/firebase"; // Firebase auth instance
import { signOut, onAuthStateChanged } from "firebase/auth"; // Firebase auth methods
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  // PopoverArrow,
} from "@/components/ui/popover"; // Popover components

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(
    null
  );

  // Listen for changes in authentication state (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("Logged in user:", firebaseUser); // Debugging log to check user details
        setIsLoggedIn(true);
        setUser({
          name: firebaseUser.displayName || "User", // Ensure displayName is populated
          avatarUrl: firebaseUser.photoURL || "", // Firebase photoURL or fallback to empty string
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
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
              <>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>

                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  {/* Avatar and Name with Dropdown */}
                  <Popover>
                    <PopoverTrigger>
                      <div className="flex flex-col items-center cursor-pointer">
                        <Avatar>
                          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-800 text-sm mt-2">
                          {user?.name}
                        </span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      {/* <PopoverArrow /> */}
                      <div className="space-y-2">
                        <Link
                          to="/profile"
                          className="block text-gray-700 hover:bg-gray-200 p-2 rounded"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block text-gray-700 hover:bg-gray-200 p-2 rounded"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left"
                        >
                          Log Out
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

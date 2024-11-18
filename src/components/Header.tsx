"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHeader from "./headers/NavHeader";
import ProfileHeader from "@/pages/profiles/ProfileHeader";
import { isAuth } from "@/utils/authUtils";
import { auth } from "@/firebase/firebaseConfig";
import { Menu, X } from "lucide-react";

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    isAuth().then(({ isLoggedIn, user }) => {
      setIsLoggedIn(isLoggedIn);
      setUser(user);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Input type="search" placeholder="Search..." className="w-64" />
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full mb-2"
            />
            {!isLoggedIn ? (
              <NavHeader />
            ) : (
              <>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
                <div className="px-3 py-2">
                  <ProfileHeader user={user} loggedOut={handleLogout} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Github, Search, Edit3, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfileHeader from "./ProfileHeader";
import { signOut } from "firebase/auth"; // Firebase auth methods
import { isAuth } from "@/utils/authUtils"; // Import the utility function
import { auth } from "@/firebase/firebaseConfig"; // Firebase auth instance
import noData from "@/assets/noData.svg";

const streakDates = [
  new Date(2023, 6, 1),
  new Date(2023, 6, 2),
  new Date(2023, 6, 3),
  new Date(2023, 6, 5),
  new Date(2023, 6, 6),
];

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        {/* Navigation bar */}
        <nav className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-6">
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
              <span className="text-xl font-bold text-gray-900">
                DiscreteLearn
              </span>
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 ${
                  isSearching ? "w-64" : "w-40"
                } transition-all duration-300`}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </form>
            <Link to="/editprofile" className="text-black">
              <Button variant="ghost">
                <Edit3 className="h-5 w-5 mr-2" />
                Edit Profile
              </Button>
            </Link>
            {isLoggedIn ? (
              <ProfileHeader user={user} loggedOut={handleLogout} />
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-grow bg-gray-100 pt-32">
        <div className="max-w-5xl mx-auto p-8">
          {/* Profile header */}
          <div className="flex items-center space-x-8 mb-8">
            <Avatar className="w-48 h-48">
              <AvatarImage
                src={user?.avatarUrl}
                alt={`${user?.name}'s profile`}
              />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
              <div className="flex items-center">
                <Github className="h-6 w-6 mr-2" />
                <span className="text-gray-600">GitHub</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="learning-tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learning-tracker">
                My Learning Tracker
              </TabsTrigger>
              <TabsTrigger value="streaks">My Streaks</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="learning-tracker">
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="archive">Archive</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex flex-col items-center justify-center h-64">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt="No learning scheduled"
                      />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <p className="mt-4 text-gray-600">No Learning Scheduled</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="streaks"
              className="flex items-center justify-center"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Learning Streak</CardTitle>
                  <CardDescription>Keep your momentum going!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">7 Days</span>
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      streak: streakDates,
                    }}
                    modifiersStyles={{
                      streak: { backgroundColor: "hsl(var(--primary))" },
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="content">
              <Card>
                <CardContent className="pt-5">
                  <div className="flex flex-col items-center justify-center h-90">
                    <p className="mt- text-xl font-semibold">
                      You have not published any content yet.
                    </p>
                    <Avatar className="w-90 h-90 mt-{-3}">
                      <AvatarImage
                        src={noData}
                        alt="No content"
                      />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

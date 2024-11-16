"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Award,
  Github,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface User {
  name: string;
  avatarUrl: string;
}
interface ProfileHeaderProps {
  user: User | null;
  loggedOut: () => void;
}

export default function ProfileHeader({ user, loggedOut }: ProfileHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild className="overflow-hidden relative">
          <Button
            variant="ghost"
            className="relative w-10 h-10 rounded-full p-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar>
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            {isHovered && (
              <div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow-lg z-50"
                style={{
                  pointerEvents: "none", // Prevent tooltip from interfering with hover
                }}
              >
                {user?.name}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold">Emmanuel Adoum</h2>
              <Link to="/profile" className="text-blue-600 text-sm">
                View Profile
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Github className="mr-2 h-4 w-4" />
              GitHub Student Pack
              <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Active
              </span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Purchases
            </Button>
            <Link to="/settings" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Account Settings
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <Palette className="mr-2 h-4 w-4" />
              Color Profile
            </Button>
            <Button
              onClick={loggedOut}
              variant="ghost"
              className="w-full justify-start"
            >
              <Award className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
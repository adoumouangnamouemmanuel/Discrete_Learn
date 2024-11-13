import {
  Home,
  BookOpen,
  FileQuestion,
  BarChart2,
  Settings,
  HelpCircle,
  Archive,
} from "lucide-react";

export const sidebarItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Problems", href: "/problems", icon: FileQuestion },
  { name: "Progress", href: "/progress", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Resources", href: "/resources", icon: Archive },
  { name: "Help", href: "/help", icon: HelpCircle },
];

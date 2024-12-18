import {
  Home,
  BookOpen,
  FileQuestion,
  BarChart2,
  Settings,
  HelpCircle,
  Archive,
  Hand,
} from "lucide-react";

export const sidebarItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Interactions", href: "/interactions", icon: Hand },
  { name: "Problems", href: "/problems", icon: FileQuestion },
  { name: "Progress", href: "/progress", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Resources", href: "/resources", icon: Archive },
  { name: "Help", href: "/help", icon: HelpCircle },
];

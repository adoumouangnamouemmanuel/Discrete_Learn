import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { ScrollArea } from "@/components/ui/scroll-area"; // Adjust the import path as necessary
import { cn } from "@/lib/utils"; // Adjust the import path as necessary
import { ModeToggle } from "./mode-toggle";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  BookOpen,
  FileQuestion,
  BarChart2,
  Settings,
  HelpCircle,
  Archive,
} from "lucide-react";

const sidebarItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Problems", href: "/problems", icon: FileQuestion },
  { name: "Progress", href: "/progress", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Resources", href: "/resources", icon: Archive },
  { name: "Help", href: "/help", icon: HelpCircle },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-gray-100 border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  location.pathname === item.href
                    ? "bg-gray-200 text-gray-900"
                    : "hover:bg-gray-200",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
            <div className="bottom-0 left-0 right-0 p-4">
              <ModeToggle />
            </div>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;

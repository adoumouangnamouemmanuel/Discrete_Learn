
import {
  ArrowLeft,
  RefreshCw,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface StataticSidebarProps {
  progressPercentage: number;
}

const StataticSidebar = ({ progressPercentage }: StataticSidebarProps) => {
  return (
    <div className="flex-none">
      <div className="p-4 border-b">
        <a
          href="/courses"
          className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          Back To Course Home
        </a>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">
            Sets in Discrete Math
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{progressPercentage.toFixed(0)}% completed</span>
              <RefreshCw className="w-4 h-4" />
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Course" className="pl-9" />
        </div>
      </div>
    </div>
  );
};

export default StataticSidebar
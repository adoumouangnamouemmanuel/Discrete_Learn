import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface CurrentLesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
}

interface footerProps {
  currentLesson: CurrentLesson;
  onMarkComplete: () => void;
}

const FooterCourse: React.FC<footerProps> = ({
  currentLesson,
  onMarkComplete,
}) => {
  return (
    <div className="border-t p-4 flex items-center justify-between bg-background">
      <Button variant="outline" className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        <span>Back lesson</span>
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {currentLesson.prevLesson}
        </span>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 bg-white",
            currentLesson.completed
              ? "border-green-500 text-green-500"
              : "border-gray-300 text-gray-700"
          )}
          onClick={onMarkComplete}
        >
          <div
            className={cn(
              "w-4 h-4 border rounded mr-2 flex items-center justify-center",
              currentLesson.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300"
            )}
          >
            {currentLesson.completed && (
              <Check className="w-3 h-3 text-white" />
            )}
          </div>
          <span>Completed</span>
        </Button>
        <Link to={`/courses/${currentLesson.nextLesson}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <span className="text-sm text-muted-foreground">
          {currentLesson.nextLesson}
        </span>
      </div>
    </div>
  );
};

export default FooterCourse;

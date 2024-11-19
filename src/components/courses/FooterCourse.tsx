import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface CurrentLesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
  content: string;
}

interface FooterProps {
  currentLesson: CurrentLesson;
  onMarkComplete: () => void;
  onNavigation: (lessonId: string) => void;
}

const FooterCourse: React.FC<FooterProps> = ({
  currentLesson,
  onMarkComplete,
  onNavigation,
}) => {
  return (
    <div className="border-t p-4 flex items-center justify-between bg-background">
      <Button
        variant="outline"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() =>
          currentLesson.prevLesson && onNavigation(currentLesson.prevLesson)
        }
        disabled={!currentLesson.prevLesson}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back lesson</span>
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 bg-white cursor-pointer",
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

        <Button
          variant="outline"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={() =>
            currentLesson.nextLesson && onNavigation(currentLesson.nextLesson)
          }
          disabled={!currentLesson.nextLesson}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FooterCourse;

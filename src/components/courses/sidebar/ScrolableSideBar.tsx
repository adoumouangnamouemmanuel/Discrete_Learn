import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface SidebarProps {
  modules: Module[];
  currentLessonId: string;
  onLessonClick: (lessonId: string) => void;
  toggleSection: (title: string) => void;
  openSections: string[];
}

const ScrolableSideBar: React.FC<SidebarProps> = ({
  modules,
  currentLessonId,
  onLessonClick,
  toggleSection,
  openSections,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {modules.map((module) => (
          <Collapsible
            key={module.id}
            open={openSections.includes(module.title)}
            onOpenChange={() => toggleSection(module.title)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-2 font-semibold hover:bg-accent rounded-lg">
              {module.title}
              {openSections.includes(module.title) ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4">
              <ul className="py-2 space-y-2">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal rounded-full pl-2 pr-4 py-1 hover:bg-gray-100",
                        currentLessonId === lesson.id && "bg-gray-100"
                      )}
                      onClick={() => onLessonClick(lesson.id)}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full mr-2 flex items-center justify-center border-2",
                          lesson.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300",
                          currentLessonId === lesson.id &&
                            !lesson.completed &&
                            "bg-black border-black"
                        )}
                      >
                        {lesson.completed && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {lesson.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </div>
  );
};

export default ScrolableSideBar;

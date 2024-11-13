import { useState } from "react";
import { initialModules } from "@/constants/coursesConstants";
import Sidebar from "@/components/courses/sidebar/Sidebar";
import FooterCourse from "@/components/courses/FooterCourse";

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

const CoursePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [currentLesson, setCurrentLesson] = useState({
    id: "l1",
    title: "Important Features",
    completed: false,
    prevLesson: "Getting Started",
    nextLesson: "Basic HTML Code",
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const completedLessons = modules.reduce(
    (sum, module) =>
      sum + module.lessons.filter((lesson) => lesson.completed).length,
    0
  );
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const handleMarkComplete = () => {
    setCurrentLesson((prev) => ({ ...prev, completed: !prev.completed }));
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === currentLesson.id
            ? { ...lesson, completed: !lesson.completed }
            : lesson
        ),
      }))
    );
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson((prev) => ({
      ...prev,
      id: lessonId,
      completed:
        modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId)
          ?.completed || false,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <Sidebar
          module={modules}
          currentLessonId={currentLesson.id}
          onLessonClick={handleLessonClick}
          progressPercentage={progressPercentage}
          toggleSection={toggleSection}
          openSections={openSections}
        />

        {/* Main Content */}
        <main className="h-screen overflow-y-auto flex flex-col">
          <div className="flex-1 p-6">
            <div className="max-w-4xl space-y-6">
              <h1 className="text-4xl font-bold">{currentLesson.title}</h1>

              <ul className="space-y-4 text-lg">
                <li>• Submenus include a portion for images</li>
                <li>• Submenus are all the same size</li>
                <li>
                  • Transitioning from one submenu to another is seamless.
                  Rather than closing and opening animations, the contents
                  change
                </li>
                <li>
                  • The submenu columns have clickable links, but the top-level
                  option is also clickable (e.g., users can click on
                  "Electronics" but also a specific type of electronics)
                </li>
                <li>• Submenu images are also clickable</li>
                <li>• When a user's mouse leaves the submenu, it closes</li>

                <li>• Submenus include a portion for images</li>
                <li>• Submenus are all the same size</li>
                <li>
                  • Transitioning from one submenu to another is seamless.
                  Rather than closing and opening animations, the contents
                  change
                </li>
                <li>
                  • The submenu columns have clickable links, but the top-level
                  option is also clickable (e.g., users can click on
                  "Electronics" but also a specific type of electronics)
                </li>
                <li>• Submenu images are also clickable</li>
                <li>• When a user's mouse leaves the submenu, it closes</li>
              </ul>
            </div>
          </div>

          {/* Navigation Footer */}
          <FooterCourse currentLesson={currentLesson} onMarkComplete={handleMarkComplete}/>
        </main>
      </div>
    </div>
  );
};


export default CoursePage;
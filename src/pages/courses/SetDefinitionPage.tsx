// CoursePage.tsx
import FooterCourse from "@/components/courses/FooterCourse";
import Sidebar from "@/components/courses/sidebar/Sidebar";
import { initialModules } from "@/constants/coursesConstants";
import { useState } from "react";
import CourseContent from "@/components/courses/CourseContent"; // Ensure correct import path

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  modules: number;
  lessons: Lesson[];
}

const CoursePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(
    modules
      .flatMap((module) => module.lessons)
      .find((lesson) => lesson.id === "DefinitionAshesi1")!
  );

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
              {/* Course Content */}
              <CourseContent lesson={currentLesson} />
            </div>
          </div>

          {/* Navigation Footer */}
          <FooterCourse
            currentLesson={currentLesson}
            onMarkComplete={handleMarkComplete}
          />
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
import StataticSidebar from "./StataticSidebar";
import ScrolableSideBar from "./ScrolableSideBar";

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
  module: Module[];
  currentLessonId: string;
  onLessonClick: (lessonId: string) => void;
  progressPercentage: number;
  toggleSection: (title: string) => void;
  openSections: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  module,
  currentLessonId,
  onLessonClick,
  toggleSection,
  progressPercentage,
  openSections,
}) => {
  // Determine the current module title
  const currentModuleTitle =
    module.find((m) =>
      m.lessons.some((lesson) => lesson.id === currentLessonId)
    )?.title || "Course Module";

  return (
    <div className="border-r flex flex-col h-screen">
      <StataticSidebar
        progressPercentage={progressPercentage}
        currentModuleTitle={currentModuleTitle}
      />

      <ScrolableSideBar
        modules={module}
        currentLessonId={currentLessonId}
        onLessonClick={onLessonClick}
        toggleSection={toggleSection}
        openSections={openSections}
      />
    </div>
  );
};

export default Sidebar;

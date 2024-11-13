// CourseContent.tsx
// import { initialModules } from "@/constants/coursesConstants"; // Ensure correct import path

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
  content: string;
}

interface CourseContentProps {
  lesson: Lesson;
}

const CourseContent: React.FC<CourseContentProps> = ({ lesson }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{lesson.title}</h2>
      <p className="mt-4">{lesson.content}</p>
    </div>
  );
};

export default CourseContent;

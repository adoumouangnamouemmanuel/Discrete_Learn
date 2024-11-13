// components/courses/LessonContent.tsx

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  content: string; // Add content property for each lesson if necessary
}

interface LessonContentProps {
  lesson: Lesson;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{lesson.title}</h1>
      <p>{lesson.content}</p>
    </div>
  );
};

export default LessonContent;

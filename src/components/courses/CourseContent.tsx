import { useEffect, useState } from "react";

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
  const [content, setContent] = useState(lesson.content);

  useEffect(() => {
    setContent(lesson.content);
  }, [lesson]);

  return (
    <div>
      <h2 className="text-3xl font-semibold">{lesson.title}</h2>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default CourseContent;

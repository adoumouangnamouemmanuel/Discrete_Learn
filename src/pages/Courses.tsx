import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { initialModules } from "@/constants/coursesConstants";

interface CourseProgress {
  [courseId: string]: {
    completedLessons: string[];
    lastAccessedLesson: string;
  };
}

const CoursesPage = () => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem("courseProgress");
    if (savedProgress) {
      setCourseProgress(JSON.parse(savedProgress));
    }
  }, []);

  const getFirstLessonId = (courseId: string) => {
    const course = initialModules.find((c) => c.id === courseId);
    return course?.lessons[0]?.id || courseId;
  };

  const calculateProgress = (courseId: string): number => {
    const course = initialModules.find((c) => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.lessons.length;
    const completedLessons =
      courseProgress[courseId]?.completedLessons.length || 0;
    return (completedLessons / totalLessons) * 100;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialModules.map((course) => {
          const progress = calculateProgress(course.id);
          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-500">
                  {course.modules} modules
                </p>
                <Progress
                  value={progress}
                  className="w-full"
                  aria-label={`Course progress: ${progress.toFixed(0)}%`}
                />
                <p className="text-sm text-gray-500">
                  {progress.toFixed(0)}% completed
                </p>
                <Button asChild className="w-full">
                  <Link to={`/courses/${getFirstLessonId(course.id)}`}>
                    {progress > 0 ? "Continue Course" : "Start Course"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;

import { Button } from "@/components/ui/button"; // Adjust the import paths as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import paths as needed
import { Link } from "react-router-dom"; // Use react-router-dom for navigation

import { initialModules } from "@/constants/coursesConstants";

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialModules.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {course.modules} modules
              </p>
              <Button>
                <Link to={`/courses/${course.id}`}>Start Course</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

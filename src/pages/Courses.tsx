import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import paths as needed
import { Button } from "@/components/ui/button"; // Adjust the import paths as needed
import { Link } from "react-router-dom"; // Use react-router-dom for navigation

const courses = [
  {
    id: "definition",
    title: "Set Definition",
    description: "Learn about sets, subsets, and set operations.",
    modules: 9,
  },
  {
    id: "set-theory",
    title: "Set Theory",
    description: "Learn about sets, subsets, set operations, and more.",
    modules: 8,
  },
  {
    id: "graph-theory",
    title: "Graph Theory",
    description: "Explore vertices, edges, paths, and graph algorithms.",
    modules: 10,
  },
  {
    id: "logic-and-proofs",
    title: "Logic and Proofs",
    description:
      "Master propositional logic, predicate logic, and proof techniques.",
    modules: 12,
  },
  // Add more courses as needed 
];

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
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

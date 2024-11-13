import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import paths as needed
import { Button } from "@/components/ui/button"; // Adjust the import paths as needed
import { Badge } from "@/components/ui/badge"; // Adjust the import paths as needed
import { Link } from "react-router-dom"; // Use react-router-dom for navigation

const problems = [
  {
    id: 1,
    title: "Set Union",
    description: "Find the union of two given sets.",
    difficulty: "Easy",
    category: "Set Theory",
  },
  {
    id: 2,
    title: "Graph Coloring",
    description:
      "Color the vertices of a graph with the minimum number of colors.",
    difficulty: "Medium",
    category: "Graph Theory",
  },
  {
    id: 3,
    title: "Logical Equivalence",
    description: "Prove the logical equivalence of two given statements.",
    difficulty: "Hard",
    category: "Logic",
  },
  // Add more problems as needed
];

const ProblemsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Practice Problems</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Card key={problem.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{problem.title}</CardTitle>
                <Badge
                  variant={
                    problem.difficulty === "Easy"
                      ? "secondary"
                      : problem.difficulty === "Medium"
                      ? "default"
                      : "destructive"
                  }
                >
                  {problem.difficulty}
                </Badge>
              </div>
              <CardDescription>{problem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{problem.category}</p>
              <Button>
                <Link to={`/problems/${problem.id}`}>Solve Problem</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProblemsPage;

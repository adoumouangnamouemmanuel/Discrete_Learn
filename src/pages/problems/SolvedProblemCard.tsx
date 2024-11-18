import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState} from "react";

type Problem = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  level: string;
  solveStatus: "solved" | "unsolved";
  topic?: string;
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function SolvedProblemCard({
  problem,
  onExpand,
  example,
}: {
  problem: Problem;
  onExpand: () => void;
  example?: { description: string; example: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">
            {problem.question}
          </CardTitle>
          <Badge
            className={`${
              difficultyColors[problem.level as keyof typeof difficultyColors]
            } capitalize`}
          >
            {problem.level}
          </Badge>
        </div>
        <CardDescription>{problem.id}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-green-600 mb-2">
          <Check className="w-5 h-5 mr-2" />
          Solved
        </div>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onExpand}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Hide Problem
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Review Problem
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Question:</h4>
              <p>{problem.question}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Correct Answer:</h4>
              <p>{problem.correctAnswer}</p>
            </div>
            {example && (
              <div className="p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold mb-2">Example:</h4>
                <p>{example.description}</p>
                <p className="mt-2 font-mono">{example.example}</p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

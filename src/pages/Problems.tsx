"use client";

import { useState, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProblemCard from "@/pages/problems/ProblemCard";
// import SolvedProblemCard from "@/pages/problems/SolvedProblemCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { problemSections } from "@/constants/problems";
import {
  // ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  // RefreshCw,
  // X,
} from "lucide-react";
// import { initializeApp } from "firebase/app";
import {  doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import confetti from "canvas-confetti";

// Initialize Firebase (make sure to replace with your own config)
// const firebaseConfig = {
//   // Your Firebase config here
// };

import {firestore, auth} from "@/firebase/firebaseConfig";

// const app = initializeApp(firebaseConfig);
const db = firestore

type Problem = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  level: string;
  solveStatus: "solved" | "unsolved";
  topic?: string;
  attempts?: number;
  score?: number;
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function ProblemsPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [submittedProblems, setSubmittedProblems] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadUserProgress(user.uid);
      } else {
        setUserId(null);
        setProblems(problemSections.flatMap((section) => section.problems));
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserProgress = async (uid: string) => {
    const docRef = doc(db, "Problem_Solving_Progress", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedProblems = problemSections.flatMap((section) =>
        section.problems.map((problem) => {
          const savedProblem = data.problems.find(
            (p: { problemId: string; status: string; attempts: number; score: number }) => p.problemId === problem.id
          );
          if (savedProblem) {
            return {
              ...problem,
              solveStatus: savedProblem.status,
              attempts: savedProblem.attempts,
              score: savedProblem.score,
              topic: savedProblem.topic,
            };
          }
          return problem;
        })
      );
      setProblems(updatedProblems);
    } else {
      setProblems(problemSections.flatMap((section) => section.problems));
    }
  };

  const saveUserProgress = async () => {
    if (!userId) return;

    const problemProgress = problems.map((problem) => ({
      problemId: problem.id,
      status: problem.solveStatus,
      attempts: problem.attempts || 0,
      score: problem.score || 0,
      topic: problem.topic,
      completionTime: new Date().toISOString(),
    }));

    await setDoc(doc(db, "Problem_Solving_Progress", userId), {
      courseId: "problem-solving-course", // Replace with actual course ID
      courseTitle: "Discrete Math", // Replace with actual course title
      lastUpdated: new Date().toISOString(),
      problems: problemProgress,
    });
  };

  const calculateScore = (problem: Problem, isCorrect: boolean): number => {
    const baseScore =
      problem.level === "easy" ? 10 : problem.level === "medium" ? 20 : 30;
    const attempts = (problem.attempts || 0) + 1;
    if (isCorrect) {
      return Math.max(baseScore - (attempts - 1) * 5, 0);
    }
    return 0;
  };

  const handleSubmitAnswer = (problem: Problem) => {
    const isCorrect = selectedAnswers[problem.id] === problem.correctAnswer;
    const attempts = (problem.attempts || 0) + 1;
    const score = calculateScore(problem, isCorrect);

    const updatedProblem: Problem = {
      ...problem,
      solveStatus: isCorrect || attempts >= 3 ? "solved" : "unsolved",
      attempts,
      score,
    };

    setProblems((prevProblems) =>
      prevProblems.map((p) => (p.id === problem.id ? updatedProblem : p))
    );

    setSubmittedProblems((prev) => [...prev, problem.id]);

    if (isCorrect) {
      triggerCelebration();
    }

    saveUserProgress();
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleTryAgain = (problemId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [problemId]: "" }));
    setSubmittedProblems((prev) => prev.filter((id) => id !== problemId));
  };

  const toggleShowExample = (problemId: string) => {
    setShowExamples((prev) => ({ ...prev, [problemId]: !prev[problemId] }));
  };

  const handleNextProblem = (currentProblemId: string) => {
    const currentIndex = filteredProblems.findIndex(
      (p) => p.id === currentProblemId
    );
    const nextProblem =
      filteredProblems[currentIndex + 1] || filteredProblems[0];
    setExpandedProblem(nextProblem.id);
  };

  const getExampleForProblem = (
    problem: Problem
  ): { description: string; example: string } | undefined => {
    const section = problemSections.find((s) => s.title === problem.topic);
    return section?.examples[0];
  };

  const filteredProblems = useMemo(() => {
    return problems.filter(
      (problem) =>
        (selectedTopics.length === 0 ||
          (problem.topic && selectedTopics.includes(problem.topic))) &&
        (selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(problem.level)) &&
        (problem.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [problems, selectedTopics, selectedDifficulties, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Practice Problems</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-full">
          <div className="mb-6 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-lg font-semibold mb-2">Topics</h3>
                    <ScrollArea className="h-[200px]">
                      {problemSections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <Checkbox
                            id={section.id}
                            checked={selectedTopics.includes(section.title)}
                            onCheckedChange={() => {
                              setSelectedTopics((prev) =>
                                prev.includes(section.title)
                                  ? prev.filter((t) => t !== section.title)
                                  : [...prev, section.title]
                              );
                            }}
                          />
                          <label
                            htmlFor={section.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {section.title}
                          </label>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
                    {["easy", "medium", "hard"].map((difficulty) => (
                      <div
                        key={difficulty}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => {
                            setSelectedDifficulties((prev) =>
                              prev.includes(difficulty)
                                ? prev.filter((d) => d !== difficulty)
                                : [...prev, difficulty]
                            );
                          }}
                        />
                        <label
                          htmlFor={difficulty}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                        >
                          {difficulty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Tabs defaultValue="unsolved">
            <TabsList className="mb-4">
              <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
              <TabsTrigger value="solved">Solved</TabsTrigger>
            </TabsList>
            <TabsContent value="unsolved">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredProblems
                  .filter((p) => p.solveStatus === "unsolved")
                  .map((problem) => (
                    <ProblemCard
                      key={problem.id}
                      problem={problem}
                      isExpanded={expandedProblem === problem.id}
                      onExpand={() => setExpandedProblem(problem.id)}
                      selectedAnswer={selectedAnswers[problem.id]}
                      onAnswerSelect={(answer) =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [problem.id]: answer,
                        }))
                      }
                      onSubmit={() => handleSubmitAnswer(problem)}
                      showExample={showExamples[problem.id]}
                      onToggleExample={() => toggleShowExample(problem.id)}
                      isSubmitted={submittedProblems.includes(problem.id)}
                      onNextProblem={() => handleNextProblem(problem.id)}
                      onTryAgain={() => handleTryAgain(problem.id)}
                      example={getExampleForProblem(problem)}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="solved">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProblems
                  .filter((p) => p.solveStatus === "solved")
                  .map((problem) => (
                    <SolvedProblemCard
                      key={problem.id}
                      problem={problem}
                      onExpand={() => setExpandedProblem(problem.id)}
                      example={getExampleForProblem(problem)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


function SolvedProblemCard({
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
        <p className="text-sm text-gray-600 mb-2">
          Score: {problem.score || 0}
        </p>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onExpand()}
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

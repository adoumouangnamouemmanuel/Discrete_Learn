"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { problemSections } from "@/constants/problems";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Problem = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  level: string;
  solveStatus: "solved" | "unsolved";
};

type ProblemSection = {
  id: string;
  title: string;
  examples: { id: string; description: string; example: string }[];
  problems: Problem[];
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const ProblemsPage = () => {
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
  const [problems, setProblems] = useState<Problem[]>(
    problemSections.flatMap((section) => section.problems)
  );

  const allTopics = useMemo(
    () => problemSections.map((section) => section.title),
    []
  );
  const allDifficulties = ["easy", "medium", "hard"];

  const filteredProblems = useMemo(() => {
    return problems.filter(
      (problem) =>
        (selectedTopics.length === 0 ||
          selectedTopics.includes(problem.topic)) &&
        (selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(problem.level)) &&
        (problem.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [problems, selectedTopics, selectedDifficulties, searchQuery]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleProblemExpansion = (problemId: string) => {
    setExpandedProblem(expandedProblem === problemId ? null : problemId);
  };

  const handleAnswerSelect = (problemId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [problemId]: answer }));
  };

  const handleSubmitAnswer = (problem: Problem) => {
    setSubmittedProblems((prev) => [...prev, problem.id]);
    if (selectedAnswers[problem.id] === problem.correctAnswer) {
      setProblems((prev) =>
        prev.map((p) =>
          p.id === problem.id ? { ...p, solveStatus: "solved" } : p
        )
      );
    }
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
    toggleProblemExpansion(nextProblem.id);
  };

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
              icon={<Search className="w-4 h-4 text-gray-500" />}
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
                      {allTopics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <Checkbox
                            id={topic}
                            checked={selectedTopics.includes(topic)}
                            onCheckedChange={() => handleTopicChange(topic)}
                          />
                          <label
                            htmlFor={topic}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {topic}
                          </label>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
                    {allDifficulties.map((difficulty) => (
                      <div
                        key={difficulty}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() =>
                            handleDifficultyChange(difficulty)
                          }
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
                      onExpand={() => toggleProblemExpansion(problem.id)}
                      selectedAnswer={selectedAnswers[problem.id]}
                      onAnswerSelect={(answer) =>
                        handleAnswerSelect(problem.id, answer)
                      }
                      onSubmit={() => handleSubmitAnswer(problem)}
                      showExample={showExamples[problem.id]}
                      onToggleExample={() => toggleShowExample(problem.id)}
                      isSubmitted={submittedProblems.includes(problem.id)}
                      onNextProblem={() => handleNextProblem(problem.id)}
                      onTryAgain={() => handleTryAgain(problem.id)}
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
                      onExpand={() => toggleProblemExpansion(problem.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProblemCard = ({
  problem,
  isExpanded,
  onExpand,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  showExample,
  onToggleExample,
  isSubmitted,
  onNextProblem,
  onTryAgain,
}) => {
  return (
    <Card
      className={`w-full transition-all duration-300 ${
        isExpanded ? "md:col-span-2" : ""
      }`}
    >
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
        <CardDescription>{problem.topic}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={onExpand}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Hide Problem
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Solve Problem
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
              {problem.choices.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={choice}
                    id={`${problem.id}-${index}`}
                  />
                  <Label htmlFor={`${problem.id}-${index}`}>{choice}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={onSubmit}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
              <Button variant="outline" onClick={onToggleExample}>
                {showExample ? "Hide Example" : "Show Example"}
              </Button>
            </div>
            {isSubmitted && (
              <div className="p-4 rounded-md bg-gray-100">
                {selectedAnswer === problem.correctAnswer ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5 mr-2" />
                    Correct! Well done!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center text-red-600">
                      <X className="w-5 h-5 mr-2" />
                      Wrong answer. Try again!
                    </div>
                    <Button
                      variant="outline"
                      onClick={onTryAgain}
                      className="w-full"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            )}
            {showExample && problem.examples && problem.examples.length > 0 && (
              <div className="p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold mb-2">Example:</h4>
                <p>{problem.examples[0].description}</p>
                <p className="mt-2 font-mono">{problem.examples[0].example}</p>
              </div>
            )}
            {isSubmitted && selectedAnswer === problem.correctAnswer && (
              <Button onClick={onNextProblem} className="w-full">
                Next Problem <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

const SolvedProblemCard = ({ problem, onExpand }) => {
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
        <CardDescription>{problem.topic}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-green-600 mb-2">
          <Check className="w-5 h-5 mr-2" />
          Solved
        </div>
        <Button variant="outline" className="w-full" onClick={() => onExpand()}>
          Review Problem
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProblemsPage;

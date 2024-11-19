"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

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

export default function ProblemCard({
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
  example,
}: {
  problem: Problem;
  isExpanded: boolean;
  onExpand: () => void;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  onSubmit: () => void;
  showExample: boolean;
  onToggleExample: () => void;
  isSubmitted: boolean;
  onNextProblem: () => void;
  onTryAgain: () => void;
  example?: { description: string; example: string };
}) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [localIsSubmitted, setLocalIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const attemptsLeft = 3 - (problem.attempts || 0);

  const handleSubmit = () => {
    setLocalIsSubmitted(true);
    const correct = selectedAnswer === problem.correctAnswer;
    setIsCorrect(correct);
      
      if (correct) {
        triggerCelebration();
      }
      onSubmit();
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleTryAgain = () => {
    setLocalIsSubmitted(false);
    setIsCorrect(false);
    onTryAgain();
  };

  useEffect(() => {
    if (
      isSubmitted &&
      !localIsSubmitted &&
      selectedAnswer === problem.correctAnswer
    ) {
      setLocalIsSubmitted(true);
      setIsCorrect(true);
      triggerCelebration();
    }
  }, [isSubmitted, localIsSubmitted, selectedAnswer, problem.correctAnswer]);

  return (
    <Card
      className={`w-full transition-all duration-300 ${
        isExpanded ? "md:col-span-2" : ""
      } relative`}
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
              {problem.choices.map((choice: string, index: number) => (
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
                onClick={handleSubmit}
                disabled={!selectedAnswer || isSubmitted || attemptsLeft === 0}
              >
                Submit Answer
              </Button>
              <Button variant="outline" onClick={onToggleExample}>
                {showExample ? "Hide Example" : "Show Example"}
              </Button>
            </div>
            <AnimatePresence>
              {localIsSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-md bg-gray-100"
                >
                  {isCorrect ? (
                    <div className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-2" />
                      Correct! Well done!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center text-red-600">
                        <X className="w-5 h-5 mr-2" />
                        Wrong answer.{" "}
                        {attemptsLeft > 0
                          ? `You have ${attemptsLeft} attempt${
                              attemptsLeft > 1 ? "s" : ""
                            } left.`
                          : "No attempts left."}
                      </div>
                      {attemptsLeft > 0 && (
                        <Button
                          variant="outline"
                          onClick={handleTryAgain}
                          className="w-full"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      )}
                      {attemptsLeft === 0 && (
                        <div>
                          <p>The correct answer is: {problem.correctAnswer}</p>
                          <p>Your score: {problem.score || 0}</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {showExample && example && (
              <div className="p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold mb-2">Example:</h4>
                <p>{example.description}</p>
                <p className="mt-2 font-mono">{example.example}</p>
              </div>
            )}
            {localIsSubmitted && isCorrect && (
              <Button onClick={onNextProblem} className="w-full">
                Next Problem <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <AnimatePresence>
              {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-4xl font-bold text-green-600">
              🎉 Great job! 🎉
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

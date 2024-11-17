"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast";

export default function ComputerRepresentation() {
  const [setA, setSetA] = useState<number[]>([]);
  const [setB, setSetB] = useState<number[]>([]);
  const [newElement, setNewElement] = useState("");
  const [operation, setOperation] = useState<
    "union" | "intersection" | "difference" | "symmetric_difference"
  >("union");
  const [userAnswer, setUserAnswer] = useState("");

  const addElement = (set: "A" | "B") => {
    const element = parseInt(newElement);
    if (!isNaN(element)) {
      if (set === "A") {
        setSetA([...setA, element]);
      } else {
        setSetB([...setB, element]);
      }
      setNewElement("");
    }
  };

  const renderBitString = (set: number[]) => {
    const maxElement = Math.max(...setA, ...setB, 7); // Ensure at least 8 bits
    return Array.from({ length: maxElement + 1 }, (_, i) =>
      set.includes(i) ? "1" : "0"
    ).join("");
  };

  const performOperation = (a: number[], b: number[]): number[] => {
    switch (operation) {
      case "union":
        return [...new Set([...a, ...b])];
      case "intersection":
        return a.filter((x) => b.includes(x));
      case "difference":
        return a.filter((x) => !b.includes(x));
      case "symmetric_difference":
        return [
          ...a.filter((x) => !b.includes(x)),
          ...b.filter((x) => !a.includes(x)),
        ];
    }
  };

  const checkAnswer = () => {
    const result = performOperation(setA, setB);
    const correctAnswer = renderBitString(result);
    if (userAnswer === correctAnswer) {
    //   toast({
    //     title: "Correct!",
    //     description: "Your bit string matches the correct result.",
    //   });
    // } else {
    //   toast({
    //     title: "Incorrect",
    //     description: `The correct bit string is: ${correctAnswer}`,
    //     variant: "destructive",
    //   });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="setA">Set A</Label>
          <div className="flex mt-1">
            <Input
              id="setA"
              type="number"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              className="mr-2"
            />
            <Button onClick={() => addElement("A")}>Add to A</Button>
          </div>
          <p className="mt-2">Elements: {setA.join(", ")}</p>
          <p className="font-mono">Bit string: {renderBitString(setA)}</p>
        </div>
        <div>
          <Label htmlFor="setB">Set B</Label>
          <div className="flex mt-1">
            <Input
              id="setB"
              type="number"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              className="mr-2"
            />
            <Button onClick={() => addElement("B")}>Add to B</Button>
          </div>
          <p className="mt-2">Elements: {setB.join(", ")}</p>
          <p className="font-mono">Bit string: {renderBitString(setB)}</p>
        </div>
      </div>
      <div>
        <Label htmlFor="operation-select">Select an operation</Label>
        <Select
          onValueChange={(
            value:
              | "union"
              | "intersection"
              | "difference"
              | "symmetric_difference"
          ) => setOperation(value)}
        >
          <SelectTrigger id="operation-select">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="union">Union</SelectItem>
            <SelectItem value="intersection">Intersection</SelectItem>
            <SelectItem value="difference">Difference</SelectItem>
            <SelectItem value="symmetric_difference">
              Symmetric Difference
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="user-answer">Enter the resulting bit string</Label>
        <Input
          id="user-answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter the bit string"
        />
      </div>
      <Button onClick={checkAnswer}>Check Answer</Button>
    </div>
  );
}

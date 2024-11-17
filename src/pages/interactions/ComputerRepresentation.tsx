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
import { toast } from "react-toastify";

export default function ComputerRepresentation() {
  const [setA, setSetA] = useState<number[]>([]);
  const [setB, setSetB] = useState<number[]>([]);
  const [newElementA, setNewElementA] = useState("");
  const [newElementB, setNewElementB] = useState("");
  const [operation, setOperation] = useState<
    | "union"
    | "intersection"
    | "difference"
    | "complement"
    | "symmetric_difference"
  >("union");
  const [complementSet, setComplementSet] = useState<"A" | "B">("A");
  const [differenceOrder, setDifferenceOrder] = useState<"A-B" | "B-A">("A-B");
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);

  const addElement = (set: "A" | "B") => {
    const element = parseInt(set === "A" ? newElementA : newElementB);
    if (!isNaN(element)) {
      if (set === "A") {
        setSetA([...setA, element]);
        setNewElementA("");
      } else {
        setSetB([...setB, element]);
        setNewElementB("");
      }
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
        return differenceOrder === "A-B"
          ? a.filter((x) => !b.includes(x))
          : b.filter((x) => !a.includes(x));
      case "complement":
        return complementSet === "A"
          ? b.filter((x) => !a.includes(x))
          : a.filter((x) => !b.includes(x));
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
      toast.success("Correct! Your bit string matches the correct result.");
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
      if (attempts < 2) {
        toast.error(`Incorrect. You have ${3 - attempts - 1} attempts left.`);
      } else {
        toast.info(`The correct bit string is: ${correctAnswer}`);
        setAttempts(0);
      }
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
              value={newElementA}
              onChange={(e) => setNewElementA(e.target.value)}
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
              value={newElementB}
              onChange={(e) => setNewElementB(e.target.value)}
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
              | "complement"
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
            <SelectItem value="complement">Complement</SelectItem>
            <SelectItem value="symmetric_difference">
              Symmetric Difference
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {operation === "complement" && (
        <div>
          <Label htmlFor="complement-select">Complement of:</Label>
          <Select
            value={complementSet}
            onValueChange={(value: "A" | "B") => setComplementSet(value)}
          >
            <SelectTrigger id="complement-select">
              <SelectValue placeholder="Select set for complement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Set A</SelectItem>
              <SelectItem value="B">Set B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {operation === "difference" && (
        <div>
          <Label htmlFor="difference-select">Difference order:</Label>
          <Select
            value={differenceOrder}
            onValueChange={(value: "A-B" | "B-A") => setDifferenceOrder(value)}
          >
            <SelectTrigger id="difference-select">
              <SelectValue placeholder="Select difference order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-B">A - B</SelectItem>
              <SelectItem value="B-A">B - A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
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

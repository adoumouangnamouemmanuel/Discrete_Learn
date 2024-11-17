"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

type Operation =
  | "union"
  | "intersection"
  | "difference"
  | "complement"
  | "symmetric_difference";

interface InteractiveVennDiagramProps {
  operation: Operation;
}

export default function InteractiveVennDiagram({
  operation,
}: InteractiveVennDiagramProps) {
  const [setA, setSetA] = useState<string[]>([]);
  const [setB, setSetB] = useState<string[]>([]);
  const [newElementA, setNewElementA] = useState("");
  const [newElementB, setNewElementB] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [complementSet, setComplementSet] = useState<"A" | "B">("A");
  const [differenceOrder, setDifferenceOrder] = useState<"A-B" | "B-A">("A-B");

  const addElement = (set: "A" | "B") => {
    if (set === "A" && newElementA.trim() !== "") {
      setSetA([...setA, newElementA.trim()]);
      setNewElementA("");
    } else if (set === "B" && newElementB.trim() !== "") {
      setSetB([...setB, newElementB.trim()]);
      setNewElementB("");
    }
  };

  const performOperation = useCallback(() => {
    switch (operation) {
      case "union":
        setResult([...new Set([...setA, ...setB])]);
        break;
      case "intersection":
        setResult(setA.filter((x) => setB.includes(x)));
        break;
      case "difference":
        if (differenceOrder === "A-B") {
          setResult(setA.filter((x) => !setB.includes(x)));
        } else {
          setResult(setB.filter((x) => !setA.includes(x)));
        }
        break;
      case "complement":
        if (complementSet === "A") {
          setResult(setB.filter((x) => !setA.includes(x)));
        } else {
          setResult(setA.filter((x) => !setB.includes(x)));
        }
        break;
      case "symmetric_difference":
        setResult([
          ...setA.filter((x) => !setB.includes(x)),
          ...setB.filter((x) => !setA.includes(x)),
        ]);
        break;
    }
  }, [operation, setA, setB, complementSet, differenceOrder]);

  const getElementPosition = (element: string) => {
    const inA = setA.includes(element);
    const inB = setB.includes(element);
    if (inA && inB) return "intersection";
    if (inA) return "leftOnly";
    if (inB) return "rightOnly";
    return "outside";
  };

  useEffect(() => {
    performOperation();
  }, [setA, setB, operation, complementSet, differenceOrder, performOperation]);

  return (
    <div className="space-y-4">
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
      <Button onClick={performOperation} className="w-full">
        Perform {operation}{" "}
        {operation === "complement" ? `of ${complementSet}` : ""}
        {operation === "difference" ? ` (${differenceOrder})` : ""}
      </Button>
      <AnimatePresence>
        {result.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-100 rounded-md"
          >
            <h3 className="font-bold mb-2">Result:</h3>
            <p>{result.join(", ")}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Label htmlFor="setA">Set A</Label>
          <div className="flex mt-1">
            <Input
              id="setA"
              value={newElementA}
              onChange={(e) => setNewElementA(e.target.value)}
              placeholder="Add element to A"
              className="mr-2"
            />
            <Button onClick={() => addElement("A")}>Add</Button>
          </div>
          <div className="mt-2">{setA.join(", ")}</div>
        </div>
        <div className="w-1/2">
          <Label htmlFor="setB">Set B</Label>
          <div className="flex mt-1">
            <Input
              id="setB"
              value={newElementB}
              onChange={(e) => setNewElementB(e.target.value)}
              placeholder="Add element to B"
              className="mr-2"
            />
            <Button onClick={() => addElement("B")}>Add</Button>
          </div>
          <div className="mt-2">{setB.join(", ")}</div>
        </div>
      </div>
      <div className="relative w-80 h-80 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="80"
            cy="100"
            r="60"
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
          />
          <circle
            cx="120"
            cy="100"
            r="60"
            fill="rgba(239, 68, 68, 0.2)"
            stroke="rgb(239, 68, 68)"
            strokeWidth="2"
          />
          <text x="50" y="100" textAnchor="middle" fill="black">
            A
          </text>
          <text x="150" y="100" textAnchor="middle" fill="black">
            B
          </text>
          {[...new Set([...setA, ...setB])].map((item, index) => {
            const position = getElementPosition(item);
            let x, y;
            switch (position) {
              case "intersection":
                x = 100;
                y = 100 + index * 20;
                break;
              case "leftOnly":
                x = 60;
                y = 70 + index * 20;
                break;
              case "rightOnly":
                x = 140;
                y = 70 + index * 20;
                break;
              default:
                x = 0;
                y = 0;
            }
            return (
              <text
                key={item}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="12"
                fill="black"
              >
                {item}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

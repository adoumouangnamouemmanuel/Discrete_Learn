"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InteractiveVennDiagramProps {
  operation:
    | "union"
    | "intersection"
    | "difference"
    | "complement"
    | "symmetric_difference";
}

export default function InteractiveVennDiagram({
  operation,
}: InteractiveVennDiagramProps) {
  const [setA, setSetA] = useState<string[]>([]);
  const [setB, setSetB] = useState<string[]>([]);
  const [newElement, setNewElement] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const addElement = (set: "A" | "B") => {
    if (newElement.trim() !== "") {
      if (set === "A") {
        setSetA([...setA, newElement.trim()]);
      } else {
        setSetB([...setB, newElement.trim()]);
      }
      setNewElement("");
    }
  };

  const performOperation = () => {
    switch (operation) {
      case "union":
        setResult([...new Set([...setA, ...setB])]);
        break;
      case "intersection":
        setResult(setA.filter((x) => setB.includes(x)));
        break;
      case "difference":
        setResult(setA.filter((x) => !setB.includes(x)));
        break;
      case "complement":
        setResult(setB.filter((x) => !setA.includes(x)));
        break;
      case "symmetric_difference":
        setResult([
          ...setA.filter((x) => !setB.includes(x)),
          ...setB.filter((x) => !setA.includes(x)),
        ]);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Label htmlFor="setA">Set A</Label>
          <div className="flex mt-1">
            <Input
              id="setA"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              placeholder="Add element"
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
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              placeholder="Add element"
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
          {setA.map((item, index) => (
            <text
              key={`A-${index}`}
              x="60"
              y={70 + index * 20}
              fontSize="12"
              fill="black"
            >
              {item}
            </text>
          ))}
          {setB.map((item, index) => (
            <text
              key={`B-${index}`}
              x="140"
              y={70 + index * 20}
              fontSize="12"
              fill="black"
            >
              {item}
            </text>
          ))}
        </svg>
      </div>
      <Button onClick={performOperation} className="w-full">
        Perform {operation}
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
    </div>
  );
}

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

const setIdentities = [
  { name: "Commutative (Union)", formula: "A ∪ B = B ∪ A" },
  { name: "Commutative (Intersection)", formula: "A ∩ B = B ∩ A" },
  { name: "Associative (Union)", formula: "(A ∪ B) ∪ C = A ∪ (B ∪ C)" },
  { name: "Associative (Intersection)", formula: "(A ∩ B) ∩ C = A ∩ (B ∩ C)" },
  {
    name: "Distributive (Union over Intersection)",
    formula: "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)",
  },
  {
    name: "Distributive (Intersection over Union)",
    formula: "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
  },
  { name: "De Morgan's (Union)", formula: "(A ∪ B)' = A' ∩ B'" },
  { name: "De Morgan's (Intersection)", formula: "(A ∩ B)' = A' ∪ B'" },
  { name: "Idempotent (Union)", formula: "A ∪ A = A" },
  { name: "Idempotent (Intersection)", formula: "A ∩ A = A" },
  { name: "Negation (Union)", formula: "A ∪ A' = U" },
  { name: "Negation (Intersection)", formula: "A ∩ A' = ∅" },
];

export default function SetIdentityPractice() {
  const [selectedIdentity, setSelectedIdentity] = useState(setIdentities[0]);
  const [userAnswer, setUserAnswer] = useState("");

  const checkAnswer = () => {
    if (
      userAnswer.replace(/\s/g, "") ===
      selectedIdentity.formula.replace(/\s/g, "")
    ) {
    //   toast({
    //     title: "Correct!",
    //     description: "Your answer matches the set identity.",
    //   });
    // } else {
    //   toast({
    //     title: "Incorrect",
    //     description: `The correct answer is: ${selectedIdentity.formula}`,
    //     variant: "destructive",
    //   });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="identity-select">Select a Set Identity</Label>
        <Select
          onValueChange={(value) =>
            setSelectedIdentity(
              setIdentities.find((i) => i.name === value) || setIdentities[0]
            )
          }
        >
          <SelectTrigger id="identity-select">
            <SelectValue placeholder="Select a set identity" />
          </SelectTrigger>
          <SelectContent>
            {setIdentities.map((identity) => (
              <SelectItem key={identity.name} value={identity.name}>
                {identity.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="user-answer">
          Enter the formula for the selected identity
        </Label>
        <Input
          id="user-answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter the formula"
        />
      </div>
      <Button onClick={checkAnswer}>Check Answer</Button>
    </div>
  );
}

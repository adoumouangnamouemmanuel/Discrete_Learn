

type Problem = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  level: string;
  solveStatus: "unsolved" | "solved";
  topic?: string;
};


export const problemSections: {
  id: string;
  title: string;
  examples: { id: string; description: string; example: string }[];
  problems: Problem[];
}[] = [
  {
    id: "CardinalityQ1",
    title: "Cardinality of Sets",
    examples: [
      {
        id: "CardinalityExample1",
        description: "The cardinality of a finite set A is denoted by |A|.",
        example: "|{1,2,3}| = 3",
      },
      {
        id: "CardinalityExample2",
        description: "If A and B are two disjoint sets, then |A ∩ B| = 0.",
        example: "Let A = {1, 2} and B = {3, 4}, |A ∪ B| = 4.",
      },
    ],
    problems: [
      {
        id: "CardinalityQ1",
        question: "If |A|=5, |B|=3, and |A ∩ B|=2, what is |A ∪ B|?",
        choices: ["6", "7", "8", "10"],
        correctAnswer: "7",
        level: "easy",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ2",
        question: "If |A|=12, |B|=8, and |A ∪ B|=15, what is |A ∩ B|?",
        choices: ["3", "5", "7", "8"],
        correctAnswer: "3",
        level: "easy",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ3",
        question: "If |A|=8, |B|=6, and |A ∩ B|=4, what is |A ∪ B|?",
        choices: ["8", "10", "12", "14"],
        correctAnswer: "10",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ4",
        question:
          "If |A|=20, |B|=15, and |A ∩ B|=10, find |A ∪ B| if A and B are disjoint sets.",
        choices: ["25", "30", "35", "None of the above"],
        correctAnswer: "30",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ5",
        question:
          "Given three sets A, B, and C such that |A|=10, |B|=15, |C|=20, and |A ∩ B ∩ C|=5, what is |A ∪ B ∪ C|?",
        choices: ["20", "35", "45", "50"],
        correctAnswer: "35",
        level: "hard",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ6",
        question:
          "Let |A|=10, |B|=12, and |A ∪ B|=20. What is |A ∩ B| if A and B are subsets of U?",
        choices: ["0", "2", "4", "None of the above"],
        correctAnswer: "2",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ7",
        question:
          "Prove that for any finite sets A and B, |A ∪ B| = |A| + |B| - |A ∩ B|.",
        choices: [
          "Mathematical proof",
          "Cannot be determined",
          "Contradiction",
          "None of the above",
        ],
        correctAnswer: "Mathematical proof",
        level: "hard",
        solveStatus: "unsolved",
      },
      {
        id: "CardinalityQ8",
        question: "If |A|=15, |B|=10, |C|=5, and |A ∩ B|=2, find |A ∩ B ∩ C|.",
        choices: ["2", "3", "4", "None of the above"],
        correctAnswer: "None of the above",
        level: "hard",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ9",
        question:
          "If A and B are subsets of U, |U|=50, |A|=30, |B|=25, |A ∩ B|=20, what is |A ∪ B|?",
        choices: ["35", "40", "45", "50"],
        correctAnswer: "40",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
      {
        id: "CardinalityQ10",
        question: "If A={1,2,3}, B={3,4,5}, and C={1,3,5}, find |A ∪ B ∪ C|.",
        choices: ["3", "5", "7", "8"],
        correctAnswer: "5",
        level: "easy",
        solveStatus: "unsolved",
        topic: "Cardinality of Sets",
      },
    ],
  },
  {
    id: "Tuples",
    title: "Tuples",
    examples: [
      {
        id: "TuplesExample1",
        description:
          "Tuples are ordered collections of elements, and allow repetition.",
        example: "(1, 2, 2) is a valid tuple.",
      },
      {
        id: "TuplesExample2",
        description:
          "The Cartesian product of sets creates tuples. A × B = {(a, b) | a ∈ A, b ∈ B}.",
        example:
          "If A = {1,2} and B = {x,y}, then A × B = {(1,x), (1,y), (2,x), (2,y)}.",
      },
    ],
    problems: [
      {
        id: "TuplesQ1",
        question: "Identify whether the following is a tuple: (1, 2, 3)",
        choices: ["Yes", "No", "Can't determine", "None of the above"],
        correctAnswer: "Yes",
        level: "easy",
        solveStatus: "unsolved",
        topic: "Tuples",
      },
      {
        id: "TuplesQ2",
        question:
          "Which of the following tuples are equal? (a, b, c) and (a, b, c)",
        choices: ["Yes", "No", "Can't determine", "None of the above"],
        correctAnswer: "Yes",
        level: "easy",
        solveStatus: "unsolved",
        topic: "Tuples",
      },
      {
        id: "TuplesQ3",
        question: "Determine the length of the tuple (a, b, c, d, e).",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "5",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Tuples",
      },
      {
        id: "TuplesQ4",
        question: "What is the 2nd element of the tuple (x, y, z, w)?",
        choices: ["x", "y", "z", "w"],
        correctAnswer: "y",
        level: "medium",
        solveStatus: "unsolved",
        topic: "Tuples",
      },
      {
        id: "TuplesQ5",
        question: "If A = {1, 2} and B = {x, y}, what is A × B?",
        choices: [
          "{(1, x), (1, y), (2, x), (2, y)}",
          "{(1, y), (1, x), (2, y), (2, x)}",
          "{(x, 1), (y, 1), (x, 2), (y, 2)}",
          "None",
        ],
        correctAnswer: "{(1, x), (1, y), (2, x), (2, y)}",
        level: "hard",
        solveStatus: "unsolved",
        topic: "Tuples",
      },
      // Remaining problems follow the same structure...
    ],
  },
  // Repeat structure for other sections...
];

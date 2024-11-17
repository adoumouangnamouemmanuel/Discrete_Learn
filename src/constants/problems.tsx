export const problemSections = [
  {
    id: "CardinalityOfSets",
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
      },
      {
        id: "CardinalityQ2",
        question: "If |A|=12, |B|=8, and |A ∪ B|=15, what is |A ∩ B|?",
        choices: ["3", "5", "7", "8"],
        correctAnswer: "3",
        level: "easy",
      },
      {
        id: "CardinalityQ3",
        question: "If |A|=8, |B|=6, and |A ∩ B|=4, what is |A ∪ B|?",
        choices: ["8", "10", "12", "14"],
        correctAnswer: "10",
        level: "medium",
      },
      {
        id: "CardinalityQ4",
        question:
          "If |A|=20, |B|=15, and |A ∩ B|=10, find |A ∪ B| if A and B are disjoint sets.",
        choices: ["25", "30", "35", "None of the above"],
        correctAnswer: "30",
        level: "medium",
      },
      {
        id: "CardinalityQ5",
        question:
          "Given three sets A, B, and C such that |A|=10, |B|=15, |C|=20, and |A ∩ B ∩ C|=5, what is |A ∪ B ∪ C|?",
        choices: ["20", "35", "45", "50"],
        correctAnswer: "35",
        level: "hard",
      },
      {
        id: "CardinalityQ6",
        question:
          "Let |A|=10, |B|=12, and |A ∪ B|=20. What is |A ∩ B| if A and B are subsets of U?",
        choices: ["0", "2", "4", "None of the above"],
        correctAnswer: "2",
        level: "medium",
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
      },
      {
        id: "CardinalityQ8",
        question: "If |A|=15, |B|=10, |C|=5, and |A ∩ B|=2, find |A ∩ B ∩ C|.",
        choices: ["2", "3", "4", "None of the above"],
        correctAnswer: "None of the above",
        level: "hard",
      },
      {
        id: "CardinalityQ9",
        question:
          "If A and B are subsets of U, |U|=50, |A|=30, |B|=25, |A ∩ B|=20, what is |A ∪ B|?",
        choices: ["35", "40", "45", "50"],
        correctAnswer: "40",
        level: "medium",
      },
      {
        id: "CardinalityQ10",
        question: "If A={1,2,3}, B={3,4,5}, and C={1,3,5}, find |A ∪ B ∪ C|.",
        choices: ["3", "5", "7", "8"],
        correctAnswer: "5",
        level: "easy",
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
      },
      {
        id: "TuplesQ2",
        question:
          "Which of the following tuples are equal? (a, b, c) and (a, b, c)",
        choices: ["Yes", "No", "Can't determine", "None of the above"],
        correctAnswer: "Yes",
        level: "easy",
      },
      {
        id: "TuplesQ3",
        question: "Determine the length of the tuple (a, b, c, d, e).",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "5",
        level: "medium",
      },
      {
        id: "TuplesQ4",
        question: "What is the 2nd element of the tuple (x, y, z, w)?",
        choices: ["x", "y", "z", "w"],
        correctAnswer: "y",
        level: "medium",
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
      },
      // Add remaining problems
    ],
  },
  {
    id: "CartesianProduct",
    title: "Cartesian Product",
    examples: [
      {
        id: "CartesianExample1",
        description:
          "The Cartesian product of sets results in all ordered pairs from the sets.",
        example:
          "If A = {1,2} and B = {x,y}, then A × B = {(1,x), (1,y), (2,x), (2,y)}.",
      },
      {
        id: "CartesianExample2",
        description:
          "Cartesian product with empty sets results in an empty set.",
        example: "If A = {1,2} and B = {}, then A × B = {}.",
      },
    ],
    problems: [
      {
        id: "CartesianQ1",
        question:
          "X × Y = {(a,b); a belongs to X, b belongs to Y}. |X| = n, |Y| = m, then what is the value of |X × Y|?",
        choices: ["m²", "m²n²", "n²", "None of the above"],
        correctAnswer: "None of the above",
        level: "medium",
      },
      {
        id: "CartesianQ2",
        question:
          "If A = {2, 5} and B = {3, 8}, then what is the value of A × B?",
        choices: ["[{2,3},{2,8},{5,3},{5,8}]", "None"],
        correctAnswer: "[{2,3},{2,8},{5,3},{5,8}]",
        level: "easy",
      },
      {
        id: "CartesianQ3",
        question:
          "Compute the Cartesian product A × B × C where A={1}, B={2}, C={3}.",
        choices: [],
        correctAnswer: [],
        level: "hard",
      },
      // Add remaining problems
    ],
  },
];

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
      },
      {
        id: "CardinalityQ2",
        question: "If |A|=12, |B|=8, and |A ∪ B|=15, what is |A ∩ B|?",
        choices: ["3", "5", "7", "8"],
        correctAnswer: "3",
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
      },
      {
        id: "TuplesQ2",
        question: "Which of the following pairs of tuples are equal?",
        choices: [
          "(a,b,c) and (a,b,c)",
          "(1,2) and (2,1)",
          "(3,3) and (3,3,3)",
          "None of the above",
        ],
        correctAnswer: "(a,b,c) and (a,b,c)",
      },
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
      },
      {
        id: "CartesianQ2",
        question: "If A = {2,5} and B={3,8}, then what is the value of A × B?",
        choices: [
          "[{2,5},{3,8},{2,3},{5,8}]",
          "[{2,3},{2,8},{5,3},{5,8}]",
          "[{2,5},{3,8},{8,3},{2,8}]",
          "None of the above",
        ],
        correctAnswer: "[{2,3},{2,8},{5,3},{5,8}]",
      },
    ],
  },
];

// lessonContent.ts
interface LessonContent {
  id: string;
  title: string;
  sections: {
    subtitle: string;
    content: string;
    illustration?: string;
  }[];
  examples: {
    description: string;
    code?: string;
  }[];
  practiceQuestions: {
    question: string;
    options: string[];
  }[];
}


let lessonContents: LessonContent[] = [];

// Load the JSON dynamically
async function loadCourseContents() {
  try {
    const response = await fetch("/courseContent.json"); // Adjust the path if needed
    if (!response.ok) {
      throw new Error(`Failed to fetch course contents: ${response.statusText}`);
    }
    lessonContents = await response.json();
    console.log("Course contents loaded successfully", lessonContents);
  } catch (error) {
    console.error("Error loading course contents:", error);
  }
}

// Call the function to initialize the data
loadCourseContents();

// Export the data
export { lessonContents };



// export interface LessonContent {
//   id: string;
//   title: string;
//   sections: {
//     subtitle: string;
//     content: string;
//     illustration?: string;
//   }[];
//   examples: {
//     description: string;
//     code?: string;
//   }[];
//   practiceQuestions: {
//     question: string;
//     options: string[];
//     correctAnswer: number;
//   }[];
// }

// export const lessonContents: LessonContent[] = [
//   {
//     id: "SetsIntro1",
//     title: "Introduction to Sets",
//     sections: [
//       {
//         subtitle: "What is a Set?",
//         content: `In mathematics, a set is a collection of distinct and well-defined objects, called elements or members of the set. These objects can be anything: numbers, names, shapes, or even other sets. Sets provide the foundation for various branches of mathematics and are fundamental to understanding relationships and operations between groups of objects.`,
//         illustration: "/illustrations/set-intro.svg",
//       },
//       {
//         subtitle: "Characteristics of Sets",
//         content: `1. Distinct Elements: Each element in a set is unique, with no duplicates allowed.\n
// 2. Unordered Collection: The order in which elements are listed does not matter.\n
// 3. Clear Membership: It is always clear whether an object belongs to a set or not.\n
// 4. Named Sets: Sets are typically represented using capital letters (e.g., A, B, C).`,
//         illustration: "/illustrations/set-characteristics.svg",
//       },
//       {
//         subtitle: "Representing Sets",
//         content: `Sets can be expressed in two main ways:\n
// - Roster Form: Lists all elements of the set within curly braces. For example: A = {1, 2, 3, 4}.\n
// - Set-Builder Form: Describes the properties that its elements satisfy. For example: B = {x | x > 0 and x ∈ integers}.`,
//         illustration: "/illustrations/set-representation.svg",
//       },
//     ],
//     examples: [
//       {
//         description: "Example 1: A set of primary colors",
//         code: "PrimaryColors = {Red, Blue, Yellow}",
//       },
//       {
//         description: "Example 2: A set of even numbers less than 10",
//         code: "EvenNumbers = {2, 4, 6, 8}",
//       },
//     ],
//     practiceQuestions: [
//       {
//         question: "Which of the following represents a set?",
//         options: [
//           "A collection of all red cars and green buses",
//           "All even numbers below 10 written as {2, 4, 6, 8}",
//           "A list of names where duplicates are allowed",
//           "An undefined group of items",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         question: "True or False: Sets can contain duplicate elements.",
//         options: ["True", "False"],
//         correctAnswer: 1,
//       },
//     ],
//   },

//   {
//     id: "SetsDescribing2",
//     title: "Describing Sets",
//     sections: [
//       {
//         subtitle: "What is a Set?",
//         content: `A set is a collection of well-defined objects, called elements, which are grouped together based on shared properties. These elements can be anything—numbers, letters, people, or even other sets! The key characteristic of a set is that it is clearly defined, meaning that it is always obvious whether an object is a member of the set or not.`,
//         illustration: "/illustrations/set-definition.svg",
//       },
//       {
//         subtitle: "Types of Sets",
//         content: `There are several types of sets in mathematics, each with its own unique characteristics. Here are the most common types:\n
// 1. **Finite Set:** A set that contains a definite number of elements. For example: A = {1, 2, 3}.\n
// 2. **Infinite Set:** A set that contains an infinite number of elements. For example: N = {1, 2, 3, 4, 5, ...}.\n
// 3. **Equal Set:** Two sets that contain exactly the same elements. For example: A = {1, 2, 3}, B = {1, 2, 3}.\n
// 4. **Null Set (Empty Set):** A set with no elements. For example: E = {} or E = Ø.\n
// 5. **Singleton Set:** A set that contains only one element. For example: S = {7}.\n
// 6. **Universal Set:** A set that contains all the elements under consideration, usually denoted by the symbol 'U'.`,
//         illustration: "/illustrations/set-types.svg",
//       },
//       {
//         subtitle: "Set Notations",
//         content: `In set theory, different notations are used to describe and represent sets. These notations make it easy to express complex ideas in a compact form. The most common notations include:\n
// 1. **Roster (Tabular) Form:** All elements of a set are listed explicitly. For example: A = {2, 4, 6, 8}.\n
// 2. **Set-Builder Form:** Describes the set by stating a property that its members must satisfy. For example: B = {x | x is an even number greater than 0}. This means that B contains all even numbers greater than 0.\n
// 3. **Venn Diagrams:** Graphical representations of sets using circles to show relationships between different sets. Venn diagrams help visualize concepts like union, intersection, and difference between sets.`,
//         illustration: "/illustrations/set-notation.svg",
//       },
//       {
//         subtitle: "Operations on Sets",
//         content: `Sets can be combined or modified using various operations. These operations are essential for understanding relationships between different sets. Here are some key set operations:\n
// 1. **Union ( ∪ ):** The union of two sets includes all the elements from both sets, with no duplicates. For example, A ∪ B = {1, 2, 3} ∪ {3, 4, 5} = {1, 2, 3, 4, 5}.\n
// 2. **Intersection ( ∩ ):** The intersection of two sets includes only the elements that are in both sets. For example, A ∩ B = {1, 2, 3} ∩ {3, 4, 5} = {3}.\n
// 3. **Difference ( − ):** The difference of two sets includes elements from the first set that are not in the second set. For example, A − B = {1, 2, 3} − {3, 4, 5} = {1, 2}.\n
// 4. **Complement ( A′ ):** The complement of a set A refers to all the elements not in A, but in the universal set. For example, if the universal set U = {1, 2, 3, 4, 5}, and A = {1, 2}, then A′ = {3, 4, 5}.`,
//         illustration: "/illustrations/set-operations.svg",
//       },
//     ],
//     examples: [
//       {
//         description: "Example 1: A set of prime numbers less than 10",
//         code: "PrimeNumbers = {2, 3, 5, 7}",
//       },
//       {
//         description: "Example 2: Union of two sets of odd and even numbers",
//         code: "OddNumbers = {1, 3, 5, 7, 9}\nEvenNumbers = {2, 4, 6, 8, 10}\nUnion = OddNumbers ∪ EvenNumbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}",
//       },
//       {
//         description:
//           "Example 3: Intersection of two sets of vowels and consonants",
//         code: "Vowels = {a, e, i, o, u}\nConsonants = {b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z}\nIntersection = Vowels ∩ Consonants = {}",
//       },
//     ],
//     practiceQuestions: [
//       {
//         question: "Which of the following sets is a finite set?",
//         options: [
//           "Set of all natural numbers",
//           "Set of all even numbers less than 100",
//           "Set of all integers",
//           "Set of all real numbers",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         question:
//           "True or False: The union of two sets always contains only the elements that are in both sets.",
//         options: ["True", "False"],
//         correctAnswer: 1,
//       },
//       {
//         question:
//           "What is the complement of the set A = {1, 2, 3} if the universal set U = {1, 2, 3, 4, 5}?",
//         options: ["{4, 5}", "{3, 4, 5}", "{2, 3, 4, 5}", "{}"],
//         correctAnswer: 0,
//       },
//     ],
//   },
//   // Add more lesson contents here...
// ];

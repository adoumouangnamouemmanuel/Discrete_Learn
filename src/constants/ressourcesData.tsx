import { BookOpen, Video, FileText, Brain } from "lucide-react";
import book3 from "/assets/books/book3.jpg";
import book4 from "/assets/books/book4.png";
import book5 from "/assets/books/book5.jpg";
import book6 from "/assets/books/book6.jpg";
import book7 from "/assets/books/book7.jpg";
import book8 from "/assets/books/book8.jpg";
import book9 from "/assets/books/book9.png";
import book10 from "/assets/books/book10.avif";
import book1 from "/assets/books/book1.png";

export const resources = [
  {
    category: "Books",
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      {
        title: "Discrete Mathematics: An Open Introduction",
        author: "Oscar Levin",
        link: "https://discrete.openmathbooks.org/dmoi3.html",
        description:
          "A comprehensive introduction to discrete mathematics focusing on proof techniques and their applications in computer science.",
        coverImage: book1,
        content:
          "This book introduces key topics in discrete mathematics, such as set theory, logic, combinatorics, graph theory, and induction. Each chapter includes exercises and proofs, emphasizing problem-solving skills and applications in real-world scenarios.",
      },
      {
        title: "Applied Discrete Structures",
        author: "Alan Doerr and Kenneth Levasseur",
        link: "https://faculty.uml.edu/klevasseur/ads2/",
        description:
          "Covers algebraic structures, matrices, functions, graphs, and trees with applications in computer science and engineering.",
        coverImage:
          "https://landing.runestone.academy/images/runestonelogo-612.webp",
        content:
          "The book presents discrete structures like groups, rings, and fields alongside topics such as logic, graph theory, and linear algebra. Applications include cryptography, coding theory, and network design.",
      },
      {
        title: "Discrete Mathematics for Computer Science",
        author: "Ken Bogart, Scot Drysdale, and Cliff Stein",
        link: "https://www.kth.se/social/files/557ec6b0f27654784e263d66/fullbook.pdf",
        description:
          "Introduces set theory, relations, functions, logic, and proof techniques, highlighting applications in computer science.",
        coverImage: book3,
        content:
          "This textbook emphasizes the foundational principles of discrete mathematics required for computer science, including logical reasoning, algorithmic thinking, and data structure design.",
      },
      {
        title: "Fundamentals of Discrete Math for Computer Science",
        author: "David Liben-Nowell",
        link: "https://digilib.stiestekom.ac.id/assets/dokumen/ebook/feb_751204ec36ff09257368ae3383004fc7948b7e7a_1659462902.pdf",
        description:
          "Covers combinatorics, graph theory, and algorithmic reasoning with clear explanations and examples.",
        coverImage: book4,
        content:
          "Topics include graph theory, mathematical logic, and probability, with a focus on solving computational problems. The book bridges the gap between mathematical concepts and their practical applications.",
      },
      {
        title: "Discrete Mathematics: Elementary and Beyond",
        author: "László Lovász, József Pelikán, and Katalin Vesztergombi",
        link: "https://dokumen.pub/discrete-mathematics-elementary-and-beyond-9780387217772-0387217770.html",
        description:
          "Explores combinatorial mathematics and graph theory, with an emphasis on mathematical rigor and proofs.",
        coverImage: book5,
        content:
          "This book introduces elementary combinatorics, number theory, and graph theory. It includes a variety of problems and proofs designed to develop a deeper understanding of mathematical concepts.",
      },
      {
        title: "Concrete Mathematics",
        author: "Ronald Graham, Donald Knuth, Oren Patashnik",
        link: "https://seriouscomputerist.atariverse.com/media/pdf/book/Concrete%20Mathematics.pdf",
        description:
          "Blends continuous and discrete mathematics, focusing on algorithms and their applications in computing.",
        coverImage: book6,
        content:
          "The text combines discrete structures with continuous methods to solve complex problems in computing. It includes extensive examples, exercises, and insights into algorithmic efficiency.",
      },
      {
        title: "Discrete and Combinatorial Mathematics",
        author: "Ralph P. Grimaldi",
        link: "https://ci2525.wordpress.com/wp-content/uploads/2017/04/grimaldi.pdf",
        description:
          "Discusses combinatorics, algorithms, graph theory, and logic in depth.",
        coverImage: book7,
        content:
          "This book provides a detailed treatment of combinatorics, recursion, and graph algorithms, including applications in optimization and data analysis.",
      },
      {
        title: "Discrete Mathematics: A Foundation for Computer Science",
        author: "Mike Piff",
        link: "https://books.google.com.sg/books?id=TrOq4utfdksC&printsec=frontcover#v=onepage&q&f=false",
        description:
          "Provides foundational knowledge of discrete mathematics, tailored for computer science applications.",
        coverImage: book8,
        content:
          "The book covers logic, relations, functions, and graph theory, emphasizing their use in computing, including automata theory and formal languages.",
      },
      {
        title: "Introduction to Discrete Mathematics",
        author: "Richard Johnsonbaugh",
        link: "https://broman.dev/download/Discrete%20Mathematics%208th%20Edition.pdf",
        description:
          "Focuses on the mathematical foundations of computer science and engineering.",
        coverImage: book9,
        content:
          "Includes chapters on set theory, logic, graph theory, and algorithms, with problem sets and examples tailored for computer science students.",
      },
      {
        title: "Discrete Structures, Logic, and Computability",
        author: "James L. Hein",
        link: "https://www.pearson.com/en-us/subject-catalog/p/discrete-mathematical-structures-classic-version/P200000006227/9780137538782",
        description:
          "Explores logic, set theory, and algorithms with a computational focus.",
        coverImage: book10,
        content:
          "Presents discrete structures in the context of programming and algorithm design, with an emphasis on computability and computational complexity.",
      },
    ],
  },
  {
    category: "Video Courses",
    icon: <Video className="w-6 h-6" />,
    items: [
      {
        title: "Introduction to Set Theory",
        author: "MIT OpenCourseWare",
        link: "https://www.youtube.com/watch?v=LY7YmuDbuW0&t=22s",
        description: "A comprehensive lecture on set theory fundamentals.",
        coverImage: "https://example.com/mit-set-theory.jpg", // Example URL
      },
      {
        title: "Set Theory and Algebra",
        author: "Khan Academy",
        link: "https://www.youtube.com/watch?v=OCNXS_m1HWU&list=PLwPDkKEXCNflNrtW4uG2mcOY1Q0ByREuP",
        description: "Interactive lessons on set theory and its applications.",
        coverImage: "https://example.com/mit-set-theory.jpg", // Example URL
      },
      {
        title:
          "Discrete Math 1: Sets, propositional logic, factorials, permutations, combinations",
        author: "PatrickJMT",
        link: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLDDGPdw7e6Ag1EIznZ-m-qXu4XX3A0cIz",
        description:
          "A thorough video series covering various aspects of discrete math, including sets.",
      },
      {
        title: "Introduction to Set Theory",
        author: "MIT OpenCourseWare",
        link: "https://www.youtube.com/watch?v=LY7YmuDbuW0&t=22s",
        description: "A comprehensive lecture on set theory fundamentals.",
      },
      {
        title: "Set Theory and Algebra",
        author: "Khan Academy",
        link: "https://www.youtube.com/watch?v=OCNXS_m1HWU&list=PLwPDkKEXCNflNrtW4uG2mcOY1Q0ByREuP",
        description: "Interactive lessons on set theory and its applications.",
      },
      {
        title:
          "Discrete Math 1: Sets, propositional logic, factorials, permutations, combinations",
        author: "PatrickJMT",
        link: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLDDGPdw7e6Ag1EIznZ-m-qXu4XX3A0cIz",
        description:
          "A thorough video series covering various aspects of discrete math, including sets.",
      },
    ],
  },
  {
    category: "Articles",
    icon: <FileText className="w-6 h-6" />,
    items: [
      {
        title: "Set Theory: An Introduction",
        author: "Brilliant.org",
        link: "https://brilliant.org/wiki/set-theory/",
        description:
          "An interactive introduction to set theory with practice problems.",
        coverImage:
          "https://books.google.com.gh/books/content?id=efMmtAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71jJ98I0SMzhaUuP8nO5vUDcMPr3EmViXsAJjmyYbqevNWrihYWRaFS9SZVGFGaaG_hoPyKk4bwsRpASnLG-nF6lmtSiF71BLaStkSaKL4Z5yJyvS6UbEUBMrYLGV10U09_H-pQ",
        content:
          "This is a placeholder for the article content. In a real application, this would be the actual text of the article.",
      },
      {
        title: "Basic Set Theory",
        author: "Stanford Encyclopedia of Philosophy",
        link: "https://plato.stanford.edu/entries/set-theory/",
        description:
          "A comprehensive overview of set theory and its philosophical implications.",
        coverImage:
          "https://books.google.com.gh/books/content?id=efMmtAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71jJ98I0SMzhaUuP8nO5vUDcMPr3EmViXsAJjmyYbqevNWrihYWRaFS9SZVGFGaaG_hoPyKk4bwsRpASnLG-nF6lmtSiF71BLaStkSaKL4Z5yJyvS6UbEUBMrYLGV10U09_H-pQ",
        content:
          "This is a placeholder for the article content. In a real application, this would be the actual text of the article.",
      },
      {
        title: "Set Theory for Computer Science",
        author: "CS.CMU.edu",
        link: "https://www.cs.cmu.edu/~rwh/courses/clogic/notes/set-theory.pdf",
        description:
          "A detailed PDF on set theory tailored for computer science students.",
        coverImage:
          "https://books.google.com.gh/books/content?id=efMmtAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71jJ98I0SMzhaUuP8nO5vUDcMPr3EmViXsAJjmyYbqevNWrihYWRaFS9SZVGFGaaG_hoPyKk4bwsRpASnLG-nF6lmtSiF71BLaStkSaKL4Z5yJyvS6UbEUBMrYLGV10U09_H-pQ",
        content:
          "This is a placeholder for the article content. In a real application, this would be the actual text of the article.",
      },
    ],
  },
  {
    category: "Practice",
    icon: <Brain className="w-6 h-6" />,
    items: [
      {
        title: "Set Theory Practice",
        author: "Brilliant.org",
        link: "https://brilliant.org/practice/set-theory/",
        description:
          "Interactive puzzles and problems to practice set theory concepts.",
      },
      {
        title: "Set Theory Visualizer",
        author: "MathIsFun.com",
        link: "https://www.mathsisfun.com/sets/venn-diagram-interactive.html",
        description:
          "An interactive Venn diagram tool to visualize set operations.",
      },
      {
        title: "Discrete Mathematics Exercises",
        author: "CodingBat",
        link: "https://codingbat.com/java/Logic-1",
        description:
          "Programming exercises related to discrete math and logic.",
      },
    ],
  },
];

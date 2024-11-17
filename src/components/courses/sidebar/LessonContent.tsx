import React from "react";
import Image from "next/image";
// import { Code } from "lucide-react";

interface Section {
  subtitle: string;
  content: string;
  illustration?: string;
}

interface Example {
  description: string;
  code: string;
}

interface PracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: string;
  title: string;
  sections: Section[];
  examples: Example[];
  practiceQuestions: PracticeQuestion[];
}

interface LessonContentProps {
  lesson: Lesson;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.match(/^\d+\.\s/)) {
        // Numbered list item
        return (
          <li key={index} className="ml-6 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else if (line.startsWith("•")) {
        // Bullet point
        return (
          <li key={index} className="ml-6 list-disc">
            {line.substring(1).trim()}
          </li>
        );
      } else if (line.includes("=") || line.includes(":")) {
        // Line with equal sign or colon
        const [left, right] = line.split(/[=:]/);
        return (
          <div key={index} className="my-2">
            <span className="font-semibold">{left.trim()}</span>
            {line.includes("=") ? " = " : ": "}
            <code className="bg-gray-100 rounded px-1 py-0.5">
              {right.trim()}
            </code>
          </div>
        );
      } else {
        // Regular paragraph
        return (
          <p key={index} className="my-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">{lesson.title}</h1>

      {lesson.sections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-2xl font-semibold text-secondary">
            {section.subtitle}
          </h2>
          <div className="prose max-w-none">
            {renderContent(section.content)}
          </div>
          {section.illustration && (
            <div className="mt-4">
              <Image
                src={section.illustration}
                alt={`Illustration for ${section.subtitle}`}
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      ))}

      {lesson.examples.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-secondary">Examples</h2>
          {lesson.examples.map((example, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium mb-2">
                {example.description}
              </h3>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {lesson.practiceQuestions.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-secondary">
            Practice Questions
          </h2>
          {lesson.practiceQuestions.map((question, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium mb-2">{question.question}</h3>
              <ul className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      className="mr-2"
                    />
                    <label htmlFor={`question-${index}-option-${optionIndex}`}>
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonContent;

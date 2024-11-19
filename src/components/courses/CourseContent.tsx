import React, { useEffect, useState } from "react";
import { lessonContents } from "@/constants/lessonContent";

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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
  content: string;
}

interface CourseContentProps {
  lesson: Lesson;
}

const CourseContent: React.FC<CourseContentProps> = ({ lesson }) => {
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(
    null
  );

  // console.log("lesson contents", lessonContents);
  useEffect(() => {
    const content = lessonContents.find((content) => content.id === lesson.id);
    setLessonContent(content || null);
  }, [lesson]);

  if (!lessonContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">{lesson.title}</h2>
        <p>
          Content for this lesson is currently unavailable. Please check back
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">{lessonContent.title}</h2>

      {/* Render Sections */}
      {lessonContent.sections.map((section, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{section.subtitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{section.content}</p>
            {section.illustration && (
              <img
                src={section.illustration}
                alt={section.subtitle}
                className="mt-4 max-w-full h-auto"
              />
            )}
          </CardContent>
        </Card>
      ))}

      {/* Render Examples */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Examples</h3>
      {lessonContent.examples.map((example, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>Example {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{example.description}</p>
            {example.code && (
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Render Practice Questions */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Practice Questions</h3>
      {lessonContent.practiceQuestions.map((question, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{question.question}</p>
            <RadioGroup>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`q${index}-option${optionIndex}`}
                  />
                  <Label htmlFor={`q${index}-option${optionIndex}`}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {/* <Button variant="outline">Previous Lesson</Button> */}
        <Link to={`/problems`}>
          <Button
            variant="outline"
          >
            Practice More Problems <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        {/* <Button variant="outline">Next Lesson</Button> */}
      </div>
    </div>
  );
};

export default CourseContent;

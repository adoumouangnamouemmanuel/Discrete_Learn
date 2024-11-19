import React, { useEffect, useState } from "react";
import { lessonContents } from "@/constants/lessonContent";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Maximize,
  Minimize,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  video?: string;
}

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
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

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

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.match(/^\d+\./)) {
        const [number, ...rest] = line.split(/\s+/);
        const firstWord = rest[0];
        const remainingContent = rest.slice(1).join(" ");
        if (
          remainingContent.startsWith(":") ||
          remainingContent.startsWith("=")
        ) {
          return (
            <li key={index} className="ml-6 list-decimal">
              <span className="bg-gray-100">{`${number} ${firstWord}`}</span>
              {remainingContent}
            </li>
          );
        }
        return (
          <li key={index} className="ml-6 list-decimal">
            {line.replace(/^\d+\./, "")}
          </li>
        );
      } else if (line.startsWith("•")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {line.substring(1)}
          </li>
        );
      } else if (line.match(/^[A-Za-z]+\s*[=:]/)) {
        const [bold, rest] = line.split(/[=:]/);
        return (
          <p key={index} className="my-2">
            <span className="font-bold bg-gray-100 px-1 rounded">{bold}</span>
            {rest ? `:${rest}` : ""}
          </p>
        );
      } else {
        return (
          <p key={index} className="my-2">
            {line.split(/(?=Example|Note)/i).map((segment, segIndex) => {
              if (
                segment.toLowerCase().startsWith("example") ||
                segment.toLowerCase().startsWith("note")
              ) {
                const keywordEnd =
                  segment.indexOf(":") !== -1
                    ? segment.indexOf(":")
                    : segment.indexOf("=");
                const keyword = segment.slice(0, keywordEnd + 1);
                const content = segment.slice(keywordEnd + 1);
                const endOfHighlight =
                  content.indexOf(".") !== -1
                    ? content.indexOf(".") + 1
                    : content.length;
                return (
                  <React.Fragment key={segIndex}>
                    <span
                      className={
                        segment.toLowerCase().startsWith("example")
                          ? "font-bold text-gray-600"
                          : "font-bold text-red-600"
                      }
                    >
                      {keyword}
                    </span>
                    <span className="bg-gray-100">
                      {content.slice(0, endOfHighlight)}
                    </span>
                    {content.slice(endOfHighlight)}
                  </React.Fragment>
                );
              }
              return segment;
            })}
          </p>
        );
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">{lessonContent.title}</h2>

      {lessonContent.video && (
        <Card className="mb-6 relative">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Lesson Video
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVideoExpanded(!isVideoExpanded)}
              >
                {isVideoExpanded ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`aspect-w-16 aspect-h-9 ${
                isVideoExpanded ? "h-[70vh]" : ""
              }`}
            >
              <iframe
                src={`https://www.youtube.com/embed/${new URL(
                  lessonContent.video
                ).searchParams.get("v")}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => window.open(lessonContent.video, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in YouTube
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://www.savefrom.net/${lessonContent.video}`,
                    "_blank"
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Render Sections */}
      {lessonContent.sections.map((section, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{section.subtitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line">
              {formatContent(section.content)}
            </div>
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
        <Link to={`/problems`}>
          <Button variant="outline">
            Practice More Problems <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseContent;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BookOpen, Trophy, Zap } from "lucide-react";

const progressData = [
  { date: "2023-06-01", progress: 10 },
  { date: "2023-06-08", progress: 25 },
  { date: "2023-06-15", progress: 40 },
  { date: "2023-06-22", progress: 60 },
  { date: "2023-06-29", progress: 75 },
  { date: "2023-07-06", progress: 80 },
  { date: "2023-08-01", progress: 60 },
  { date: "2023-08-08", progress: 25 },
  { date: "2023-08-15", progress: 40 },
  { date: "2023-08-22", progress: 60 },
  { date: "2023-08-29", progress: 75 },
  { date: "2023-09-06", progress: 90 },
];

const completedCourses = [
  { id: 1, title: "Introduction to Set Theory", completedDate: "2023-06-15" },
  {
    id: 2,
    title: "Basic Algebra and Number Theory",
    completedDate: "2023-06-30",
  },
];

const streakDates = [
  new Date(2023, 6, 1),
  new Date(2023, 6, 2),
  new Date(2023, 6, 3),
  new Date(2023, 6, 5),
  new Date(2023, 6, 6),
];

const ProgressPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Progress</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              Your journey in discrete mathematics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">75%</span>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <Progress value={75} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your milestones and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Fast Learner</Badge>
              <Badge variant="secondary">Set Theory Master</Badge>
              <Badge variant="secondary">7-Day Streak</Badge>
              <Badge variant="secondary">Quiz Ace</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Course</CardTitle>
            <CardDescription>Advanced Set Operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold">Lesson 4 of 10</span>
              <span className="text-sm text-muted-foreground">
                40% Complete
              </span>
            </div>
            <Progress value={40} className="w-full mb-4" />
            <Button className="w-full">Continue Learning</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Your learning journey visualized</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            <ChartContainer
              config={{
                progress: {
                  label: "Progress",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="var(--color-progress)"
                    fill="var(--color-progress)"
                    fillOpacity={0.2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mt-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Completed Courses</CardTitle>
            <CardDescription>
              Your finished discrete math courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {completedCourses.map((course) => (
                <li
                  key={course.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-500" />
                    <span>{course.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(course.completedDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Streak</CardTitle>
            <CardDescription>Keep your momentum going!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">7 Days</span>
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                streak: streakDates,
              }}
              modifiersStyles={{
                streak: { backgroundColor: "hsl(var(--primary))" },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>
            Enhance your discrete mathematics knowledge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                <div>
                  <div className="font-semibold">Graph Theory Fundamentals</div>
                  <div className="text-sm text-muted-foreground">
                    Explore the basics of graph theory and its applications
                  </div>
                </div>
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                <div>
                  <div className="font-semibold">
                    Combinatorics and Probability
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dive into counting techniques and probability theory
                  </div>
                </div>
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                <div>
                  <div className="font-semibold">
                    Logic and Proof Techniques
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Master the art of logical reasoning and mathematical proofs
                  </div>
                </div>
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;

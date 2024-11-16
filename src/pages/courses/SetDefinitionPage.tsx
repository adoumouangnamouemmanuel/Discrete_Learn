import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterCourse from "@/components/courses/FooterCourse";
import Sidebar from "@/components/courses/sidebar/Sidebar";
import { initialModules } from "@/constants/coursesConstants";
import CourseContent from "@/components/courses/CourseContent";
import { auth, firestore } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  prevLesson: string;
  nextLesson: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  modules: number;
  lessons: Lesson[];
}

interface CourseProgress {
  [courseId: string]: {
    completedLessons: string[];
    lastAccessedLesson: string;
  };
}

const CoursePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({});
  const [userId, setUserId] = useState<string | null>(null);
  const { courseId: urlCourseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        // Redirect to login page or handle unauthenticated state
        // navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const loadProgress = async () => {
      if (userId) {
        try {
          const docRef = doc(firestore, "courseProgress", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data() as CourseProgress;
            setCourseProgress(data);

            setModules((prevModules) =>
              prevModules.map((module) => ({
                ...module,
                lessons: module.lessons.map((lesson) => ({
                  ...lesson,
                  completed:
                    data[module.id]?.completedLessons.includes(lesson.id) ||
                    false,
                })),
              }))
            );
          }
        } catch (error) {
          console.error("Error loading progress from Firestore:", error);
        }
      }
    };

    if (userId) {
      loadProgress();
    }
  }, [userId]);

  

  // Handle lesson changes
  useEffect(() => {
    const allLessons = modules.flatMap((module) => module.lessons);
    const lesson = allLessons.find((lesson) => lesson.id === urlCourseId);

    if (lesson) {
      const currentCourseId = modules.find((module) =>
        module.lessons.includes(lesson)
      )?.id;

      setCurrentLesson(lesson);

      if (currentCourseId) {
        setCourseProgress((prev) => ({
          ...prev,
          [currentCourseId]: {
            completedLessons: prev[currentCourseId]?.completedLessons || [],
            lastAccessedLesson: lesson.id,
          },
        }));
      }
    } else {
      const firstLesson = allLessons[0];
      if (firstLesson) {
        navigate(`/courses/${firstLesson.id}`);
      }
    }
  }, [urlCourseId, modules, navigate]);

  // Save progress
  useEffect(() => {
    if (Object.keys(courseProgress).length > 0) {
      localStorage.setItem("courseProgress", JSON.stringify(courseProgress));
    }
  }, [courseProgress]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const calculateProgress = (courseId: string): number => {
    const course = modules.find((m) => m.id === courseId);
    if (!course) return 0;

    const totalLessons = course.lessons.length;
    const completedCount =
      courseProgress[courseId]?.completedLessons?.length || 0;

    return totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  };

  const handleMarkComplete = () => {
    if (!currentLesson || !userId) return;

    const courseId = modules.find((module) =>
      module.lessons.includes(currentLesson)
    )?.id;

    if (!courseId) return;

    const isCurrentlyCompleted = currentLesson.completed;

    setCurrentLesson((prev) =>
      prev ? { ...prev, completed: !isCurrentlyCompleted } : null
    );

    setCourseProgress((prev) => {
      const existingProgress = prev[courseId] || {
        completedLessons: [],
        lastAccessedLesson: currentLesson.id,
      };

      const newCompletedLessons = isCurrentlyCompleted
        ? existingProgress.completedLessons.filter(
            (id) => id !== currentLesson.id
          )
        : [...existingProgress.completedLessons, currentLesson.id];

      const updatedProgress = {
        ...prev,
        [courseId]: {
          ...existingProgress,
          completedLessons: newCompletedLessons,
        },
      };

      // Save to Firestore
      const docRef = doc(firestore, "courseProgress", userId);
      setDoc(docRef, updatedProgress).catch((error) => {
        console.error("Error saving progress to Firestore:", error);
      });

      return updatedProgress;
    });

    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === currentLesson.id
            ? { ...lesson, completed: !isCurrentlyCompleted }
            : lesson
        ),
      }))
    );
  };

  

  const handleLessonClick = (lessonId: string) => {
    navigate(`/courses/${lessonId}`);
  };

  const handleNavigation = (lessonId: string) => {
    navigate(`/courses/${lessonId}`);
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading course content...</div>
      </div>
    );
  }

  const currentCourseId = modules.find((module) =>
    module.lessons.includes(currentLesson)
  )?.id;
  const progress = currentCourseId ? calculateProgress(currentCourseId) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[300px_1fr]">
        <Sidebar
          module={modules}
          currentLessonId={currentLesson.id}
          onLessonClick={handleLessonClick}
          progressPercentage={progress}
          toggleSection={toggleSection}
          openSections={openSections}
        />

        <main className="h-screen overflow-y-auto flex flex-col">
          <div className="flex-1 p-6">
            <div className="max-w-4xl space-y-6">
              <CourseContent lesson={currentLesson} />
            </div>
          </div>

          <FooterCourse
            currentLesson={currentLesson}
            onMarkComplete={handleMarkComplete}
            onNavigation={handleNavigation}
          />
        </main>
      </div>
    </div>
  );
};

export default CoursePage;

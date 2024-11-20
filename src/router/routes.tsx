import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const Problems = React.lazy(() => import("../pages/Problems"));
const Courses = React.lazy(() => import("../pages/Courses"));
const Settings = React.lazy(() => import("@/pages/Settings"));
const Progress = React.lazy(() => import("@/pages/Progress"));
const Help = React.lazy(() => import("@/pages/Help"));
const Resources = React.lazy(() => import("@/pages/Resources"));
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const SignUp = React.lazy(() => import("@/pages/auth/SignUp"));
const SignIn = React.lazy(() => import("@/pages/auth/Login"));
const CoursePage = React.lazy(
  () => import("@/pages/courses/CoursePage")
);
const Profile = React.lazy(() => import("@/pages/profiles/Profile"));
const Interactions = React.lazy(
  () => import("@/pages/interactions/Interactions")
);
const PasswordReset = React.lazy(() => import("@/pages/auth/passwordReset"));

const RoutesConfig = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/courses/" element={<Courses />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/help" element={<Help />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/courses/:courseId" element={<CoursePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<Settings />} />
      <Route path="/interactions" element={<Interactions />} />
      <Route path="/reset-password" element={<PasswordReset />} />
    </Routes>
  );
};

export default RoutesConfig;

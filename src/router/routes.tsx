import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Problems from "../pages/Problems";
import Courses from "../pages/Courses";
import Settings from "@/pages/Settings";
import Progress from "@/pages/Progress";
import Help from "@/pages/Help";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/Login";
import CoursePage from "@/pages/courses/SetDefinitionPage";
// import profile from "@/pages/profile";
import Profile from "@/pages/profiles/Profile";
// import EditProfilePage from "@/pages/profiles/EditProfile";
import Interactions from "@/pages/interactions/Interactions";

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
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default RoutesConfig;

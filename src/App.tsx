import RoutesConfig from "./router/routes";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./styles/global.css"; // Add your global styles

const App = () => {
  const location = useLocation();
  const ishome = location.pathname === "/";
  const isAuthentificated =
    location.pathname === "/signup" || location.pathname === "/login";
  const isCoursePage = location.pathname.startsWith("/courses/");
  const isresetPassword = location.pathname === "/reset-password";

  if (isAuthentificated) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        {/* Hide Header and Sidebar for course pages */}
        {!isAuthentificated && !isCoursePage && !isresetPassword && <Header />}
        <div className="flex flex-1 overflow-hidden">
          {!isAuthentificated && !isresetPassword && !isCoursePage && (
            <Sidebar />
          )}
          <main
            className={`${
              isAuthentificated || isCoursePage
                ? "flex-1 overflow-y-hidden p-0"
                : "flex-1 overflow-y-auto p-6"
            }`}
          >
            <RoutesConfig />
          </main>
        </div>
        {!isAuthentificated && !isresetPassword && ishome && <Footer />}
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;

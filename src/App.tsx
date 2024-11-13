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
  const isAuthentificated = location.pathname === "/signup" || location.pathname === "/login";

  // Ensure no scrollbar for the sign-up page
  if (isAuthentificated) {
    document.body.style.overflow = "hidden"; // Disable scrolling on sign-up page
  } else {
    document.body.style.overflow = "auto"; // Enable scrolling for other pages
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        {!isAuthentificated && <Header />}
        <div className="flex flex-1 overflow-hidden">
          {!isAuthentificated && <Sidebar />}
          <main
            className={`${
              isAuthentificated
                ? "flex-1 overflow-y-hidden p-0"
                : "flex-1 overflow-y-auto p-6"
            }`}
          >
            <RoutesConfig />
          </main>
        </div>
        {!isAuthentificated && ishome && <Footer />}
      </div>
      <ToastContainer /> {/* Add ToastContainer for global toasts */}
    </ThemeProvider>
  );
};

export default App;

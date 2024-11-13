import RoutesConfig from "./router/routes";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { useLocation } from "react-router-dom";
// import "./styles/global.css"; // Add your global styles

const App = () => {
  const location = useLocation();
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
          <main className={`${isAuthentificated ? "flex-1 overflow-y-hidden p-6" : "flex-1 overflow-y-auto p-6"}`} >
            <div className={`${isAuthentificated ? "h-full w-full" : ""}`}>
              <RoutesConfig />
            </div>
          </main>
        </div>
        {!isAuthentificated && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default App;

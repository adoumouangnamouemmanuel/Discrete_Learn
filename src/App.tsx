// App.tsx

import {useLocation } from "react-router-dom";
import RoutesConfig from "./router/routes";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  const location = useLocation();

  // Check if the current route is the SignUp page
  const isSignUpPage = location.pathname === "/signup";
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Header and Sidebar based on route */}
        {!isAuthPage && <Header />}
        <div className="flex flex-1 overflow-hidden">
          {/* Conditionally render Sidebar based on route */}
          {!isAuthPage && <Sidebar />}
          <main className="flex-1 overflow-y-auto p-6">
            {/* For the SignUp page, ensure it takes full height and scrolls */}
            <div className={`${isAuthPage ? "h-full" : ""}`}>
              <RoutesConfig />
            </div>
          </main>
        </div>
        {/* Conditionally render Footer based on route */}
        {!isAuthPage && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default App;

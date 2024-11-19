"use client";

import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import RoutesConfig from "./router/routes";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
};

const pageTransition = {
  type: "inertial",
  ease: "easeInOut",
  duration: .5,
};

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthenticated = ["/signup", "/login"].includes(location.pathname);
  const isCoursePage = location.pathname.startsWith("/courses/");
  const isResetPassword = location.pathname === "/reset-password";

  React.useEffect(() => {
    document.body.style.overflow = isAuthenticated ? "hidden" : "auto";
  }, [isAuthenticated]);

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        {!isAuthenticated && !isCoursePage && !isResetPassword && <Header />}
        <div className="flex flex-1 overflow-hidden">
          {!isAuthenticated && !isResetPassword && !isCoursePage && <Sidebar />}
          <main
            className={`${
              isAuthenticated || isCoursePage
                ? "flex-1 overflow-y-hidden p-0"
                : "flex-1 overflow-y-auto p-6"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <RoutesConfig />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        {!isAuthenticated && !isResetPassword && isHome && <Footer />}
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

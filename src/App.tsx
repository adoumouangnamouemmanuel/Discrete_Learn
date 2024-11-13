
import RoutesConfig from "./router/routes";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
// import "./styles/global.css"; // Add your global styles

const App = () => {
  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <RoutesConfig />
          </main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;

import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path as needed
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { FaChalkboardTeacher, FaRocket, FaTachometerAlt } from "react-icons/fa"; // Import FontAwesome icons

const Home = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Welcome to DiscreteLearn
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your go-to platform for mastering Sets with interactive
        lessons, quizzes, and real-world problem-solving.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* Key Features Section */}
        <Card className="border rounded-lg shadow-lg p-6 flex flex-col items-center">
          <CardHeader className="flex justify-center">
            <FaChalkboardTeacher className="text-4xl text-gray-800 mb-4" />
          </CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Interactive Lessons
          </CardTitle>
          <CardContent>
            <p className="text-gray-700">
              Learn complex concepts through hands-on exercises and interactive
              modules designed for better engagement.
            </p>
          </CardContent>
        </Card>

        <Card className="border rounded-lg shadow-lg p-6 flex flex-col items-center">
          <CardHeader className="flex justify-center">
            <FaRocket className="text-4xl text-gray-800 mb-4" />
          </CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Real-World Applications
          </CardTitle>
          <CardContent>
            <p className="text-gray-700">
              Apply what you learn to solve real-world problems, making
              mathematics meaningful and impactful.
            </p>
          </CardContent>
        </Card>

        <Card className="border rounded-lg shadow-lg p-6 flex flex-col items-center">
          <CardHeader className="flex justify-center">
            <FaTachometerAlt className="text-4xl text-gray-800 mb-4" />
          </CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Progress Tracking
          </CardTitle>
          <CardContent>
            <p className="text-gray-700">
              Stay motivated with a personalized dashboard that tracks your
              progress and highlights your strengths and areas for improvement.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Dive into the world of Discrete Mathematics and start your learning
          journey today!
        </p>
        <Button className="text-white bg-gray-800 hover:bg-gray-900 transition duration-200">
          <Link to="/courses">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;

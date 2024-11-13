
import { FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Updated for additional icons
import Emma from "../assets/emma.jpg"; // Updated for team member images

const About = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h1>
      <p className="text-lg text-gray-600 mb-12">
        We are a passionate team of Computer Engineering students from Ashesi
        University, dedicated to revolutionizing how students learn Discrete
        Mathematics. Our mission is to make learning engaging, interactive, and
        accessible to all.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* Team Member 1 */}
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <img
            src={Emma} // Replace with your team member's profile image
            alt="Emma Adoum"
            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-300 transform transition duration-500 hover:scale-110"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Emmanuel Adoum
          </h2>
          <p className="text-gray-600 mb-2">Founder & Lead Developer</p>
          <p className="text-gray-600 mb-4">
            Emmanuel is the visionary behind DiscreteLearn. As a passionate software
            engineer, he leads the development of the platform, creating an
            intuitive and scalable user experience for students across the
            globe.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:emmanuel.adoum@ashesi.edu.gh"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="tel:+123456789"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaPhoneAlt size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ouang-namou-emmanuel-adoum/"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <img
            src={Emma} // Replace with your team member's profile image
            alt="Ruth Arhin"
            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-300 transform transition duration-500 hover:scale-110"
          />
          <h2 className="text-xl font-semibold text-gray-800">Ruth Arhin</h2>
          <p className="text-gray-600 mb-2">Product Manager</p>
          <p className="text-gray-600 mb-4">
            Ruth ensures that DiscreteLearn is not only functional but also
            user-friendly. She works closely with students to gather feedback,
            ensuring the platform meets learners' needs and expectations.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:jane.smith@example.com"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="tel:+987654321"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaPhoneAlt size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ruth-arhin-/"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Team Member 3 */}
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <img
            src={Emma} // Replace with your team member's profile image
            alt="Nary-Ann Adzim"
            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-300 transform transition duration-500 hover:scale-110"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Nary-Ann Adzim
          </h2>
          <p className="text-gray-600 mb-2">Lead Designer</p>
          <p className="text-gray-600 mb-4">
            Mary-Ann designs the user interface of DiscreteLearn, ensuring the
            platform is visually appealing and easy to navigate. Her goal is to
            make learning Discrete Mathematics a pleasant and seamless
            experience.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:mark.johnson@example.com"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="tel:+1122334455"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
            >
              <FaPhoneAlt size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mary-ann-adzim/"
              className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="text-center mt-12 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          About DiscreteLearn
        </h2>
        <p className="text-lg text-white mb-6">
          At DiscreteLearn, we're transforming the way students interact with
          Discrete Mathematics. With interactive lessons, real-world
          applications, and personalized progress tracking, our platform is
          designed to make learning engaging and effective.
        </p>
        <p className="text-lg text-white mb-6">
          Our team is dedicated to providing a learning experience that is not
          only informative but also fun and rewarding. We believe that Discrete
          Mathematics is not just about abstract theory, but about solving
          real-world problems and understanding the world around us.
        </p>
        <p className="text-lg text-white">
          Whether you're a student just beginning your mathematical journey or
          someone looking to deepen your knowledge, DiscreteLearn is here to
          help you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default About;

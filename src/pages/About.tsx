import { FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { teamMembers } from "../constants";


const About = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h1>
      <p className="text-lg text-gray-600 mb-12">
        We are a passionate team of Computer Engineering students from Ashesi
        University, dedicated to revolutionizing how students learn Discrete
        Math. Our mission is to make learning engaging, interactive, and
        accessible to all.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-300 transform transition duration-500 hover:scale-110"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h2>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <p className="text-gray-600 mb-4">{member.description}</p>
            <div className="flex space-x-4">
              <a
                href={`mailto:${member.email}`}
                className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href={`tel:${member.phone}`}
                className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
              >
                <FaPhoneAlt size={20} />
              </a>
              <a
                href={member.linkedin}
                className="text-gray-600 hover:text-gray-800 transform transition duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>

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

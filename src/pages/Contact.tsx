import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Heading Section */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Contact Us
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        We would love to hear from you! Whether you have questions, feedback, or
        suggestions, our team is here to assist you. Please feel free to reach
        out using the form below.
      </p>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-gray-600 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transform transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Team Info Section */}
        <div className="flex flex-col items-start bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Address
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We are a team of Computer Engineering students from Ashesi
            University, dedicated to making learning Discrete Mathematics
            accessible and fun.
          </p>
          <div className="flex flex-col mb-6 space-y-4">
            {/* Address Section with Icon */}
            <div className="flex items-center space-x-2 text-gray-600">
              <FaMapMarkerAlt size={20} />
              <p>Ashesi University, Berekuso, Ghana</p>
            </div>
            {/* Email Section with Icon */}
            <div className="flex items-center space-x-2 text-gray-600">
              <FaEnvelope size={20} />
              <p>contact@discretelearn.com</p>
            </div>
            {/* Phone Section with Icon */}
            <div className="flex items-center space-x-2 text-gray-600">
              <FaPhoneAlt size={20} />
              <p>+233123456789</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Social Links */}
      <div className="flex justify-center space-x-6 mt-12">
        <a
          href="mailto:contact@discretelearn.com"
          className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
        >
          <FaEnvelope size={30} />
        </a>
        <a
          href="https://www.linkedin.com/company/discretelearn"
          className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="tel:+233123456789"
          className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
        >
          <FaPhoneAlt size={30} />
        </a>
      </div>
    </div>
  );
};

export default Contact;

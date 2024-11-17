import { useState } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emailjs from "emailjs-com";
import { toast } from "react-toastify"; // Import toast
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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

    // Send email using EmailJS
    emailjs
      .send(
        "service_vt0y2df", // Replace with your EmailJS service ID
        "template_q48cke5", // Replace with your EmailJS template ID
        formData, // Sending the form data to the template
        "0KqT5k-HXNavDNB0x" // Replace with your EmailJS user ID
      )
      .then(
        () => {
          toast.success("Form Successfully Submitted!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        },
        () => {
          toast.error(
            "There was an error sending the form. Please try again later.!",
            {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
            }
          );
        }
      );

    // Clear form data after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
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

      {/* TabsContent with New Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="w-5 h-5 mr-2 " />
              <span>support.discretelearn@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="w-5 h-5 mr-2 " />
              <span>+233 503673195</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-2" />
              <span>Ashesi University, Berekuso, Ghana</span>
            </div>
          </CardContent>
        </Card>

        {/* Send Us a Message */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              We&apos;ll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none resize-none"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <Button className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Social Links */}
      <div className="flex justify-center space-x-6 mt-12">
        <a
          href="mailto:support@discretemathcourse.com"
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
          href="tel:+15551234567"
          className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
        >
          <FaPhoneAlt size={30} />
        </a>
      </div>
    </div>
  );
};

export default Contact;

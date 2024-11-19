"use client";

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
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Contact() {
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

    emailjs
      .send(
        "service_vt0y2df",
        "template_q48cke5",
        formData,
        "0KqT5k-HXNavDNB0x"
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
            "There was an error sending the form. Please try again later.",
            {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
            }
          );
        }
      );

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-4 sm:mb-8">
        Contact Us
      </h1>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
        We would love to hear from you! Whether you have questions, feedback, or
        suggestions, our team is here to assist you. Please feel free to reach
        out using the form below.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              Contact Information
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: FaEnvelope, text: "support.discretelearn@gmail.com" },
              { icon: FaPhoneAlt, text: "+233 503673195" },
              {
                icon: FaMapMarkerAlt,
                text: "Ashesi University, Berekuso, Ghana",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center text-sm sm:text-base"
              >
                <item.icon className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              Send Us a Message
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              We&apos;ll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { name: "name", placeholder: "Your Name", type: "text" },
                { name: "email", placeholder: "Your Email", type: "email" },
                { name: "subject", placeholder: "Subject", type: "text" },
              ].map((field) => (
                <Input
                  key={field.name}
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="text-sm sm:text-base"
                />
              ))}
              <textarea
                className="w-full h-32 px-3 py-2 text-sm sm:text-base text-gray-700 border rounded-lg focus:outline-none resize-none"
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

      <div className="flex justify-center space-x-6 mt-8 sm:mt-12">
        {[
          { href: "mailto:support@discretemathcourse.com", icon: FaEnvelope },
          {
            href: "https://www.linkedin.com/company/discretelearn",
            icon: FaLinkedin,
          },
          { href: "tel:+15551234567", icon: FaPhoneAlt },
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
          >
            <link.icon size={24} className="sm:w-8 sm:h-8" />
          </a>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div {...fadeIn}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
          How Can We Help You?
        </h1>
        <div className="mb-6 md:mb-8">
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </motion.div>

      <Tabs defaultValue="quickstart" className="space-y-6">
        <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <motion.div {...fadeIn} className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                  <li>Create an account or log in</li>
                  <li>Choose a course from the main page</li>
                  <li>Start with the first lesson</li>
                  <li>Complete practice problems to reinforce learning</li>
                  <li>Track your progress in the dashboard</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Set a regular study schedule</li>
                  <li>Take notes while watching video lessons</li>
                  <li>
                    Attempt practice problems without looking at solutions first
                  </li>
                  <li>Join study groups or forums for discussion</li>
                  <li>Reach out to instructors when you need help</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="faq">
          <motion.div {...fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Find answers to common questions about our Discrete Math
                  course.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      q: "How do I reset my password?",
                      a: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you instructions to create a new password.',
                    },
                    {
                      q: "Can I access the course materials offline?",
                      a: "While most of our content requires an internet connection, you can download PDF versions of lesson notes for offline studying. Video content and interactive problems are only available online.",
                    },
                    {
                      q: "How long do I have access to the course?",
                      a: "Once you purchase a course, you have lifetime access to its materials. You can revisit and review the content as many times as you like.",
                    },
                    {
                      q: "Are there any prerequisites for this course?",
                      a: "Our Discrete Math course assumes a basic understanding of algebra. No prior experience with discrete mathematics is required. If you're comfortable with high school level math, you should be well-prepared for this course.",
                    },
                    {
                      q: "How do I track my progress in the course?",
                      a: "Your progress is automatically tracked as you complete lessons and solve problems. You can view your overall progress, as well as detailed statistics for each topic, in your personal dashboard.",
                    },
                  ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                      <AccordionTrigger className="text-sm md:text-base">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="contact">
          <motion.div {...fadeIn} className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Mail, text: "support.discretelearn@gmail.com" },
                  { icon: Phone, text: "+233 503673195" },
                  {
                    icon: MessageCircle,
                    text: "Live chat available 9 AM - 5 PM EST",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm md:text-base"
                  >
                    <item.icon className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  We'll get back to you as soon as possible
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
                      className="text-sm md:text-base"
                    />
                  ))}
                  <textarea
                    className="w-full h-32 px-3 py-2 text-sm md:text-base text-gray-700 border rounded-lg focus:outline-none resize-none"
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

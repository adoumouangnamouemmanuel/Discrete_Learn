"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { toast } from "react-toastify"; // Import toast
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
import {
  BookOpen,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div {...fadeIn}>
        <h1 className="text-4xl font-bold mb-8 text-center">
          How Can We Help You?
        </h1>
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </motion.div>

      <Tabs defaultValue="quickstart">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <motion.div {...fadeIn} className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
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
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
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
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about our Discrete Math
                  course.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I reset my password?
                    </AccordionTrigger>
                    <AccordionContent>
                      To reset your password, click on the &quot;Forgot
                      Password&quot; link on the login page. Enter your email
                      address, and we&apos;ll send you instructions to create a
                      new password.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Can I access the course materials offline?
                    </AccordionTrigger>
                    <AccordionContent>
                      While most of our content requires an internet connection,
                      you can download PDF versions of lesson notes for offline
                      studying. Video content and interactive problems are only
                      available online.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How long do I have access to the course?
                    </AccordionTrigger>
                    <AccordionContent>
                      Once you purchase a course, you have lifetime access to
                      its materials. You can revisit and review the content as
                      many times as you like.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Are there any prerequisites for this course?
                    </AccordionTrigger>
                    <AccordionContent>
                      Our Discrete Math course assumes a basic understanding of
                      algebra. No prior experience with discrete mathematics is
                      required. If you&apos;re comfortable with high school
                      level math, you should be well-prepared for this course.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How do I track my progress in the course?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your progress is automatically tracked as you complete
                      lessons and solve problems. You can view your overall
                      progress, as well as detailed statistics for each topic,
                      in your personal dashboard.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="contact">
          <motion.div {...fadeIn} className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>support.discretelearn@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+233 503673195</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Live chat available 9 AM - 5 PM EST</span>
                </div>
              </CardContent>
            </Card>
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
                    type="text"
                    required
                  />
                  <Input
                    placeholder="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    placeholder="Subject"
                    name="subject"
                    type="email"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none resize-none"
                    placeholder="Your Message"
                    name="message" // Ensure name attribute is correctly set
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase method for email/password login
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Firebase Sign-In
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Here, we will show a success toast
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/"); // Change this to wherever you'd like the user to go
      }, 3000); // Delay the redirect to allow the toast to be visible
    } catch (error) {
      alert("Error logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-50 w-full">
      <div className="bg-white p-8 m-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-600 font-medium mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md py-2"
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </form>

        <div className="text-center my-4 text-gray-500">Or</div>

        <Button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-md py-2">
          <FcGoogle size={24} />
          <span>Log In with Google</span>
        </Button>

        <p className="text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

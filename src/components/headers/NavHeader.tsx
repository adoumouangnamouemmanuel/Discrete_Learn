import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavHeader = () => {
  return (
    <>
      <Link to="/about" className="text-gray-600 hover:text-gray-900">
        About
      </Link>
      <Link to="/contact" className="text-gray-600 hover:text-gray-900">
        Contact
      </Link>
      <Link to="/login">
        <Button variant="outline">Sign In</Button>
      </Link>

      <Link to="/signup">
        <Button>Sign Up</Button>
      </Link>
    </>
  );
};

export default NavHeader;

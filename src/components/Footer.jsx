import { AiFillHome, AiOutlineInfoCircle, AiOutlineMessage, AiOutlineTeam } from 'react-icons/ai';
import { FaNewspaper } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import LinkedInIcon from "../assets/images/linkedin.jpg";
import TwitterIcon from "../assets/images/X.png";
import GitHubIcon from "../assets/images/github.png";
import EmailIcon from "../assets/images/GMail.webp";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="footerNav">
          <ul className="flex gap-4">
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600">
                <AiFillHome className="h-6 w-6" />
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600">
                <FaNewspaper className="h-6 w-6" />
                <span className="ml-2">News</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600">
                <AiOutlineInfoCircle className="h-6 w-6" />
                <span className="ml-2">About Us</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600">
                <AiOutlineMessage className="h-6 w-6" />
                <span className="ml-2">Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600">
                <AiOutlineTeam className="h-6 w-6" />
                <span className="ml-2">Our Team</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="socialicons flex gap-4">
          <a
            href="https://www.linkedin.com/in/singodiyashubham87/"
            className="hover:bg-blue-300 p-1 rounded-full"
          >
            <img
              src={LinkedInIcon}
              alt="LinkedIn"
              className="rounded-full w-8 h-8 hover:bg-blue-500"
            />
          </a>
          <a
            href="https://twitter.com/_master_mickey"
            className="hover:bg-blue-300 p-1 rounded-full"
          >
            <img
              src={TwitterIcon}
              alt="Twitter"
              className="rounded-full w-8 h-8 hover:bg-blue-500"
            />
          </a>
          <a
            href="https://github.com/singodiyashubham87"
            className="hover:bg-blue-300 p-1 rounded-full"
          >
            <img
              src={GitHubIcon}
              alt="GitHub"
              className="rounded-full w-8 h-8 hover:bg-blue-500"
            />
          </a>
          <a
            href="mailto:singodiyashubham87@gmail.com"
            className="hover:bg-blue-300 p-1 rounded-full"
          >
            <FiMail className="text-white h-6 w-6 hover:bg-blue-500" />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-white">
          Copyright &copy;{(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

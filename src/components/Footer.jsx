import React, { useState } from 'react';
import { AiFillHome, AiOutlineInfoCircle, AiOutlineMessage, AiOutlineTeam } from 'react-icons/ai';
import { FaNewspaper, FaStar } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import LinkedInIcon from "../assets/images/linkedin.jpg";
import TwitterIcon from "../assets/images/X.png";
import GitHubIcon from "../assets/images/github.png";
import RateUs from './RateUs'; // Adjust the import path as needed
import FooterLink from './FooterLink';

const Footer = () => {
  const [showRateUs, setShowRateUs] = useState(false);

  const toggleRateUs = () => {
    setShowRateUs(!showRateUs);
  };

  return (
    <>
      <footer className="bg-black">
        <div className="flex justify-between items-center py-4 px-8">
          <div className="footerNav">
            <ul className="flex gap-4">
              <li>
              <FooterLink label={"Home"}>
                <AiFillHome className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">Home</span>
              </li>
              <li>
              <FooterLink label={"News"}>
                <FaNewspaper className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">News</span>
              </li>
              <li>
              <FooterLink label={"About Us"}>
                <AiOutlineInfoCircle className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">About Us</span>
              </li>
              <li>
              <FooterLink label={"Contact Us"}>
               <AiOutlineMessage className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">Contact Us</span>
              </li>
              <li>
              <FooterLink label={"Rate Us"}>
                 <FaStar className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">Rate Us</span>
              </li>
              <li>
              <FooterLink label={"Our Team"}>
                <AiOutlineTeam className="h-6 w-6" />
              </FooterLink>
                  <span className="ml-2">Our Team</span>
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
            Made with 💝 by <a href="https://shubham-s-socials.vercel.app/" className="decoration-none font-semibold hover:underline">Master Mickey</a> Copyright &copy;{(new Date().getFullYear())}
          </p>
        </div>
      </footer>

      {showRateUs && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
            <span className="absolute top-2 right-2 cursor-pointer text-2xl font-bold" onClick={toggleRateUs}>&times;</span>
            <RateUs />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

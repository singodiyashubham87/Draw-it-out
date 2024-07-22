import React from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineMessage,
  AiOutlineTeam,
} from "react-icons/ai";
import {
  FaNewspaper,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black relative">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="footerNav">
          <ul className="flex gap-4 flex-wrap">
            {[
              { label: "News", icon: FaNewspaper, content: "News Content" },
              {
                label: "About Us",
                icon: AiOutlineInfoCircle,
                content: "About Us Content",
              },
              {
                label: "Contact Us",
                icon: AiOutlineMessage,
                content: "Contact Us Content",
              },
              {
                label: "Our Team",
                icon: AiOutlineTeam,
                content: "Our Team Content",
              },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-white flex items-center hover:text-gray-600"
                >
                  <item.icon className="h-6 w-6" />
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="socialicons flex gap-4 flex-wrap icons">
          <a
            href="https://www.linkedin.com/in/singodiyashubham87/"
            className="group"
          >
            <div className="icon transform group-hover:scale-125">
              <FaLinkedin
                className="text-white h-8 w-8 group-hover:text-linkedin"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://twitter.com/_master_mickey" className="group">
            <div className="icon transform group-hover:scale-125">
              <FaTwitter
                className="text-white h-8 w-8 group-hover:text-twitter"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://www.instagram.com" className="group">
            <div className="icon transform group-hover:scale-125 relative">
              <FaInstagram
                className="text-white h-8 w-8 relative z-10 group-hover:text-instagram"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://www.youtube.com" className="group">
            <div className="icon transform group-hover:scale-125">
              <FaYoutube
                className="text-white h-8 w-8 group-hover:text-youtube"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://github.com/singodiyashubham87" className="group">
            <div className="icon transform group-hover:scale-125">
              <FaGithub
                className="text-white h-8 w-8 group-hover:text-github"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-white">
          Made with 💝 by{" "}
          <a
            href="https://shubham-s-socials.vercel.app/"
            className="decoration-none font-semibold hover:underline"
          >
            Master Mickey
          </a>{" "}
          Copyright &copy;{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

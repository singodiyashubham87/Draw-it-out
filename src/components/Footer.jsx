import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaNewspaper,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  AiOutlineInfoCircle,
  AiOutlineMessage,
  AiOutlineTeam,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative bg-black">
      <div className="flex flex-col items-center gap-20 px-8 py-4 justify-evenly md:justify-between md:flex-row">
        <div className="footerNav">
          <ul className="flex flex-wrap gap-4 justify-evenly md:justify-between">
            {[
              { label: "Home", href: "#" },
              { label: "News", href: "#", icon: FaNewspaper },
              { label: "About Us", href: "#", icon: AiOutlineInfoCircle },
              { label: "Contact Us", href: "/contact", icon: AiOutlineMessage },
              { label: "Our Team", href: "/team", icon: AiOutlineTeam },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center text-white hover:text-gray-600"
                >
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-4 socialicons icons">
          <a
            href="https://www.linkedin.com/in/singodiyashubham87/"
            className="group"
          >
            <div className="transform icon group-hover:scale-125">
              <FaLinkedin
                className="w-8 h-8 text-white group-hover:text-linkedin"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://twitter.com/_master_mickey" className="group">
            <div className="transform icon group-hover:scale-125">
              <FaTwitter
                className="w-8 h-8 text-white group-hover:text-twitter"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://www.instagram.com" className="group">
            <div className="relative transform icon group-hover:scale-125">
              <FaInstagram
                className="relative z-10 w-8 h-8 text-white group-hover:text-instagram"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://www.youtube.com" className="group">
            <div className="transform icon group-hover:scale-125">
              <FaYoutube
                className="w-8 h-8 text-white group-hover:text-youtube"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
          <a href="https://github.com/singodiyashubham87" className="group">
            <div className="transform icon group-hover:scale-125">
              <FaGithub
                className="w-8 h-8 text-white group-hover:text-github"
                style={{ transition: "color 0.3s" }}
              />
            </div>
          </a>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-white">
          Made with 💝 by{" "}
          <a
            href="https://shubham-s-socials.vercel.app/"
            className="font-semibold decoration-none hover:underline"
          >
            Master Mickey
          </a>{" "}
          &copy;{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

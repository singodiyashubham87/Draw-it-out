import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="footerNav">
          <ul className="flex gap-4">
            <li>
              <a href="#" className="text-white hover:text-cyan-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-cyan-600">
                News
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-cyan-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-cyan-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-cyan-600">
                Our Team
              </a>
            </li>
          </ul>
        </div>
        <div className="socialicons flex gap-4">
          <a
            href="https://www.linkedin.com/in/singodiyashubham87/"
            className="rounded-full"
          >
            <FaLinkedinIn className="text-white hover:bg-blue-600 m-1" size={26}/>
          </a>
          <a
            href="https://twitter.com/_master_mickey"
            className="rounded-full"
          >
            <FaXTwitter className="text-white hover:bg-white hover:text-black m-1 " size={26}/>
          </a>
          <a
            href="https://github.com/singodiyashubham87"
            className="rounded-full"
          >
            <FaGithub className="text-white m-1" size={28}/>
          </a>
          <a
            href="mailto:singodiyashubham87@gmail.com"
            className="rounded-full"
          >
            <CiMail className="text-white m-1 hover:bg-white hover:text-red-900" size={26}/>
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-white">
          Copyright &copy;2024; Designed by{" "}
          <span className="font-bold">Shubham Singodiya</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
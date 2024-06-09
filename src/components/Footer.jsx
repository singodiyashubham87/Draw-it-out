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
              <a href="#" className="text-white hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-600">
                News
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-600">
                Our Team
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
            <img
              src={EmailIcon}
              alt="Email"
              className="rounded-full w-8 h-8 hover:bg-blue-500"
            />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-white">
          Copyright &copy;<script>document.write(new Date().getFullYear())</script> Designed by{" "}
          <span className="font-bold">Shubham Singodiya</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

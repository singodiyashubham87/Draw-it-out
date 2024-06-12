import LinkedInIcon from "../assets/images/linkedin.jpg";
import TwitterIcon from "../assets/images/X.png";
import GitHubIcon from "../assets/images/github.png";
import EmailIcon from "../assets/images/GMail.webp";
import "./Footer.css";

const aboutLink = document.getElementById('about-link');
const aboutPopup = document.getElementById('about-popup');
const aboutClosePopupButton = document.getElementById('aboutClose-popup');

aboutLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default link behavior
  aboutPopup.classList.add('show'); // Show the popup
});

aboutClosePopupButton.addEventListener('click', () => {
  aboutPopup.classList.remove('show'); // Hide the popup
});

const ourTeamLink = document.getElementById('our-team-link');
const ourTeamPopup = document.getElementById('our-team-popup');
const closePopupButton = document.getElementById('close-popup');

ourTeamLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default link behavior
  ourTeamPopup.classList.add('show'); // Show the popup
});

closePopupButton.addEventListener('click', () => {
  ourTeamPopup.classList.remove('show'); // Hide the popup
});

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
              <div id="about-popup" className="hidden">
              <p>Draw-it-out is an online whiteboard tool built using ReactJS and TailwindCSS. It allows users to draw, sketch, and take snapshots of their creations. The intuitive interface and responsive design make it easy to use across various devices.</p>
              <button id="aboutClose-popup" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Close
              </button>
             </div>
            </li>
            <li>
              <a href="https://shubham-s-socials.vercel.app/" className="text-white hover:text-gray-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-600">
                Our Team
              </a>
              <div id="our-team-popup" className="hidden">
              <p>Draw-it-out is an online whiteboard tool built using ReactJS and TailwindCSS. It allows users to draw, sketch, and take snapshots of their creations. The intuitive interface and responsive design make it easy to use across various devices.</p>
              <button id="close-popup" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Close
              </button>
             </div>
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
          Copyright &copy;2024; Designed by{" "}
          <span className="font-bold">Shubham Singodiya</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

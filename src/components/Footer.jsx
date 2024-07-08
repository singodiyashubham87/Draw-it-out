import React, { useState } from 'react';

import Modal from 'react-modal';

import { AiFillHome, AiOutlineInfoCircle, AiOutlineMessage, AiOutlineTeam } from 'react-icons/ai';
import { FaNewspaper, FaStar } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import LinkedInIcon from "../assets/images/linkedin.jpg";
import TwitterIcon from "../assets/images/X.png";
import GitHubIcon from "../assets/images/github.png";

import RateUs from './RateUs'; 
Modal.setAppElement('#root'); 
const Footer = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  return (
    <footer className="bg-black relative">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="footerNav">
          <ul className="flex gap-4 flex-wrap">
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600" onClick={() => openModal('News Content')}>
                <FaNewspaper className="h-6 w-6" />
                <span className="ml-2">News</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600" onClick={() => openModal('About Us Content')}>
                <AiOutlineInfoCircle className="h-6 w-6" />
                <span className="ml-2">About Us</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600" onClick={() => openModal('Contact Us Content')}>
                <AiOutlineMessage className="h-6 w-6" />
                <span className="ml-2">Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-white flex items-center hover:text-gray-600" onClick={() => openModal('Our Team Content')}>
                <AiOutlineTeam className="h-6 w-6" />
                <span className="ml-2">Our Team</span>
              </a>
            </li>
          </ul>
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
                <a onClick={toggleRateUs} className="text-white flex items-center hover:text-gray-600 cursor-pointer">
                  <FaStar className="h-6 w-6" />
                  <span className="ml-2">Rate Us</span>
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

      </div>
      <div className="text-center mt-4">
        <p className="text-white">
          Made with 💝 by <a href="https://shubham-s-socials.vercel.app/" className="decoration-none font-semibold hover:underline">Master Mickey</a> Copyright &copy;{new Date().getFullYear()}
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg"
        overlayClassName="overlay fixed inset-0 bg-black opacity-50"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">{modalContent}</h2>
          {modalContent === 'News Content' && (
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              mauris quam. Nullam commodo, nunc ut aliquam sagittis, nisi elit
              pellentesque odio, ut accumsan enim dolor eu odio. Vivamus vehicula
              elit non sapien dapibus, nec volutpat libero pulvinar. Suspendisse
              potenti. Proin non ornare nisi, at fermentum mauris. Aenean id orci
              ac elit pharetra lobortis. Sed id metus a tortor facilisis pharetra
              ac a est. Fusce ac fringilla justo.
            </p>
          )}
          {modalContent === 'About Us Content' && (
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              mauris quam. Nullam commodo, nunc ut aliquam sagittis, nisi elit
              pellentesque odio, ut accumsan enim dolor eu odio. Vivamus vehicula
              elit non sapien dapibus, nec volutpat libero pulvinar. Suspendisse
              potenti. Proin non ornare nisi, at fermentum mauris. Aenean id orci
              ac elit pharetra lobortis. Sed id metus a tortor facilisis pharetra
              ac a est. Fusce ac fringilla justo.
            </p>
          )}
          {modalContent === 'Contact Us Content' && (
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              mauris quam. Nullam commodo, nunc ut aliquam sagittis, nisi elit
              pellentesque odio, ut accumsan enim dolor eu odio. Vivamus vehicula
              elit non sapien dapibus, nec volutpat libero pulvinar. Suspendisse
              potenti. Proin non ornare nisi, at fermentum mauris. Aenean id orci
              ac elit pharetra lobortis. Sed id metus a tortor facilisis pharetra
              ac a est. Fusce ac fringilla justo.
            </p>
          )}
          {modalContent === 'Our Team Content' && (
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              mauris quam. Nullam commodo, nunc ut aliquam sagittis, nisi elit
              pellentesque odio, ut accumsan enim dolor eu odio. Vivamus vehicula
              elit non sapien dapibus, nec volutpat libero pulvinar. Suspendisse
              potenti. Proin non ornare nisi, at fermentum mauris. Aenean id orci
              ac elit pharetra lobortis. Sed id metus a tortor facilisis pharetra
              ac a est. Fusce ac fringilla justo.
            </p>
          )}
          <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Close
          </button>
        </div>
      </Modal>
    </footer>

      )}
    </>
  );
};

export default Footer;

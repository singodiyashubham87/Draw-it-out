import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillHome, AiOutlineInfoCircle, AiOutlineMessage, AiOutlineTeam } from 'react-icons/ai';
import { FaNewspaper } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import LinkedInIcon from "../assets/images/linkedin.jpg";
import TwitterIcon from "../assets/images/X.png";
import GitHubIcon from "../assets/images/github.png";

Modal.setAppElement('#root'); // Ensure this line is correct for accessibility

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
    <footer style={{ backgroundColor: 'black' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <div className="footerNav">
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <li>
            <a href="#" className="text-white flex items-center hover:text-gray-600">
                <AiFillHome className="h-6 w-6" />
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => openModal('News Content')}>
                <FaNewspaper style={{ height: '1.5rem', width: '1.5rem' }} />
                <span style={{ marginLeft: '0.5rem' }}>News</span>
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => openModal('About Us Content')}>
                <AiOutlineInfoCircle style={{ height: '1.5rem', width: '1.5rem' }} />
                <span style={{ marginLeft: '0.5rem' }}>About Us</span>
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => openModal('Contact Us Content')}>
                <AiOutlineMessage style={{ height: '1.5rem', width: '1.5rem' }} />
                <span style={{ marginLeft: '0.5rem' }}>Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => openModal('Our Team Content')}>
                <AiOutlineTeam style={{ height: '1.5rem', width: '1.5rem' }} />
                <span style={{ marginLeft: '0.5rem' }}>Our Team</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="socialicons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="https://www.linkedin.com/in/singodiyashubham87/" style={{ backgroundColor: 'blue', padding: '0.25rem', borderRadius: '50%' }}>
            <img src={LinkedInIcon} alt="LinkedIn" style={{ borderRadius: '50%', width: '2rem', height: '2rem' }} />
          </a>
          <a href="https://twitter.com/_master_mickey" style={{ backgroundColor: 'blue', padding: '0.25rem', borderRadius: '50%' }}>
            <img src={TwitterIcon} alt="Twitter" style={{ borderRadius: '50%', width: '2rem', height: '2rem' }} />
          </a>
          <a href="https://github.com/singodiyashubham87" style={{ backgroundColor: 'blue', padding: '0.25rem', borderRadius: '50%' }}>
            <img src={GitHubIcon} alt="GitHub" style={{ borderRadius: '50%', width: '2rem', height: '2rem' }} />
          </a>
          <a href="mailto:singodiyashubham87@gmail.com" style={{ backgroundColor: 'blue', padding: '0.25rem', borderRadius: '50%' }}>
            <FiMail style={{ color: 'white', height: '1.5rem', width: '1.5rem' }} />
          </a>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ color: 'white' }}>
          Made with 💝 by <a href="https://shubham-s-socials.vercel.app/" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white' }}>Master Mickey</a> Copyright &copy;{new Date().getFullYear()}
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '500px',
          },
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{modalContent}</h2>
          <button onClick={closeModal} style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;

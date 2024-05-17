import React from 'react';
import LinkedInIcon from '../assets/images/linkedin.jpg';
import TwitterIcon from '../assets/images/X.png'; 
import GitHubIcon from '../assets/images/github.png'; 
import EmailIcon from '../assets/images/GMail.webp';
import './style.css'; 

const Footer = () => {
    return (
        <footer>
            <div className="footercontainer">
                <div className="socialicons">
                    <a href="https://www.linkedin.com/in/singodiyashubham87/"><img src={LinkedInIcon} alt="LinkedIn" style={{ color: '#1d4486', fontSize: '3em' }} /></a>
                    <a href="https://twitter.com/_master_mickey"><img src={TwitterIcon} alt="Twitter" style={{ color: '#050505', fontSize: '3em' }} /></a>
                    <a href="https://github.com/singodiyashubham87"><img src={GitHubIcon} alt="GitHub" style={{ color: '#000000', fontSize: '3em' }} /></a>
                    <a href="mailto:singodiyashubham87@gmail.com"><img src={EmailIcon} alt="Email" style={{ color: '#000000', fontSize: '3em' }} /></a>
                </div>
                <div className="footerNav">
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">News</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact Us</a></li>
                        <li><a href="">Our Team</a></li>
                    </ul>
                </div>
            </div>
            <div className="footerBottom">
                <p>Copyright &copy;2024; Designed by <span className="designer">Shubham Singodiya</span></p>
            </div>
        </footer>
    );
};

export default Footer;

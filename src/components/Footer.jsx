import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black">
            <div className="flex justify-between items-center py-4 px-8">
                <div className="footerNav">
                    <ul className="flex gap-4">
                        <li><a href="#" className="text-white hover:text-gray-600">Home</a></li>
                        <li><a href="#" className="text-white hover:text-gray-600">News</a></li>
                        <li><a href="#" className="text-white hover:text-gray-600">About</a></li>
                        <li><a href="#" className="text-white hover:text-gray-600">Contact Us</a></li>
                        <li><a href="#" className="text-white hover:text-gray-600">Our Team</a></li>
                    </ul>
                </div>
                <div className="socialicons flex gap-4">
                    <a href="https://www.linkedin.com/in/singodiyashubham87/" className="hover:bg-blue-300 p-1 rounded-full">
                        <img src="/assets/images/linkedin.jpg" alt="LinkedIn" className="rounded-full w-8 h-8 hover:bg-blue-500" />
                    </a>
                    <a href="https://twitter.com/_master_mickey" className="hover:bg-blue-300 p-1 rounded-full">
                        <img src="/assets/images/X.png" alt="Twitter" className="rounded-full w-8 h-8 hover:bg-blue-500" />
                    </a>
                    <a href="https://github.com/singodiyashubham87" className="hover:bg-blue-300 p-1 rounded-full">
                        <img src="/assets/images/github.png" alt="GitHub" className="rounded-full w-8 h-8 hover:bg-blue-500" />
                    </a>
                    <a href="mailto:singodiyashubham87@gmail.com" className="hover:bg-blue-300 p-1 rounded-full">
                        <img src="/assets/images/GMail.webp" alt="Email" className="rounded-full w-8 h-8 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
            <div className="text-center mt-4">
                <p className="text-white">Copyright &copy;2024; Designed by <span className="font-bold">Shubham Singodiya</span></p>
            </div>
        </footer>
    );
};

export default Footer;

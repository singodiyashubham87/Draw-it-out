// src/pages/ContactPage.jsx
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col bg-blue-500 p-4">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">We would love to hear from you! Whether you have questions about our drawing services or just want to say hello, feel free to reach out.</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <div className="flex items-center mb-3">
                <FaPhone className="text-blue-500 mr-3" />
                <span className="text-gray-700">+1 (234) 567-890</span>
              </div>
              <div className="flex items-center mb-3">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span className="text-gray-700">contact@drawitout.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                <span className="text-gray-700">123 Art Street, Creativity City, CA</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows="4" className="w-full p-2 border border-gray-300 rounded" required></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

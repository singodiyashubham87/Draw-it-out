// import React, { useEffect, useRef, useState } from 'react';
// import './Chatbot.css'; // Import your CSS file

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { content: "Hi there 👋\nHow can I help you today?", sender: "bot" }
//   ]);
//   const [inputHeight, setInputHeight] = useState('auto');
//   const chatInputRef = useRef(null);

//   useEffect(() => {
//     if (chatInputRef.current) {
//       setInputHeight(`${chatInputRef.current.scrollHeight}px`);
//     }
//   }, [messages]);

//   const userMessage = useRef(null); // Ref for user's message

//   const generateResponse = async () => {
//     const API_URL = "https://api.openai.com/v1/chat/completions";

//     try {
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: userMessage.current }]
//         })
//       };

//       const response = await fetch(API_URL, requestOptions);
//       const data = await response.json();
//       const botMessage = data.choices[0].message.content.trim();

//       setMessages(prevMessages => [
//         ...prevMessages,
//         { content: botMessage, sender: "bot" }
//       ]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { content: "Oops! Something went wrong. Please try again.", sender: "bot" }
//       ]);
//     }
//   };

//   const handleSendMessage = () => {
//     const message = chatInputRef.current.value.trim();
//     if (message === "") return;

//     setMessages([...messages, { content: message, sender: "user" }]);
//     userMessage.current = message;
//     chatInputRef.current.value = "";
//     generateResponse();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleCloseChatbot = () => {
//     // Close the chatbot container
//     document.body.classList.remove("show-chatbot");
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot">
//         <header>
//           <h2>Chatbot</h2>
//           <span className="close-btn material-symbols-outlined" onClick={handleCloseChatbot}>close</span>
//         </header>
//         <ul className="chatbox">
//           {messages.map((message, index) => (
//             <li key={index} className={`chat ${message.sender === "user" ? "outgoing" : "incoming"}`}>
//               {message.sender === "bot" && <span className="material-symbols-outlined">smart_toy</span>}
//               <p>{message.content}</p>
//             </li>
//           ))}
//         </ul>
//         <div className="chat-input">
//           <textarea
//             ref={chatInputRef}
//             style={{ height: inputHeight }}
//             placeholder="Enter a message..."
//             spellCheck="false"
//             onKeyDown={handleKeyDown}
//           ></textarea>
//           <span id="send-btn" className="material-symbols-rounded" onClick={handleSendMessage}>send</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

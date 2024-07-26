import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { TbMessageChatbot } from "react-icons/tb";

// Define the steps for the chatbot
const steps = [
  {
    id: "0",
    message: "Hey artist!",
    trigger: "waitForResponse1",
  },
  {
    id: "waitForResponse1",
    user: true,
    trigger: "1",
  },
  {
    id: "1",
    message: "What are you drawing today?",
    trigger: "waitForResponse2",
  },
  {
    id: "waitForResponse2",
    user: true,
    trigger: "drawingConfirmation",
  },
  {
    id: "drawingConfirmation",
    message: "Sure, do you want any suggestions on what to draw?",
    trigger: "waitForResponse3",
  },
  {
    id: "waitForResponse3",
    options: [
      { value: "yes", label: "Yes", trigger: "drawingOptions" },
      { value: "no", label: "No", trigger: "end" },
    ],
  },
  {
    id: "drawingOptions",
    message: "Here are some drawing options:",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Drawing of someone you love", trigger: "end" },
      { value: 2, label: "Fruits in a basket", trigger: "end" },
      { value: 3, label: "Landscape with mountains", trigger: "end" },
      { value: 4, label: "Random shapes forming a pattern", trigger: "end" },
      { value: 5, label: "Animals coexisting with each other", trigger: "end" },
      {
        value: 6,
        label: "Drawing of yourself conveying an emotion",
        trigger: "end",
      },
      {
        value: 7,
        label: "Different flowers showcased in a vase",
        trigger: "end",
      },
      { value: 8, label: "Well-known buildings", trigger: "end" },
      {
        value: 9,
        label: "Various seashells lying on the beach shore",
        trigger: "end",
      },
      {
        value: 10,
        label: "Your version of a cover of the book you love",
        trigger: "end",
      },
      { value: 11, label: "Cartoon versions of famous people", trigger: "end" },
      { value: 12, label: "Underwater scenes", trigger: "end" },
      { value: 13, label: "A cartoon character that you love", trigger: "end" },
      { value: 14, label: "Birds in the sky", trigger: "end" },
      {
        value: 15,
        label: "A flower showing all of its parts in detail",
        trigger: "end",
      },
      {
        value: 16,
        label: "Drawing of the space capturing all the planets",
        trigger: "end",
      },
      {
        value: 17,
        label:
          "Cartoon characters doing everyday human routines like cooking or washing dishes",
        trigger: "end",
      },
      { value: 18, label: "Fantasy animals like dragons", trigger: "end" },
      {
        value: 19,
        label: "Design an outfit you would love to wear",
        trigger: "end",
      },
      {
        value: 20,
        label: "Capture different activities happening on the street",
        trigger: "end",
      },
      {
        value: 21,
        label: "Abstract painting of what you’re feeling now",
        trigger: "end",
      },
      { value: 22, label: "Haunted house", trigger: "end" },
      { value: 23, label: "Different hand poses", trigger: "end" },
      { value: 24, label: "Capture sports players playing", trigger: "end" },
      {
        value: 25,
        label:
          "Drawing of people with different skin tones and cultures together",
        trigger: "end",
      },
      { value: 26, label: "Drawing Ideas", trigger: "end" },
      { value: 27, label: "An imaginary building", trigger: "end" },
      {
        value: 28,
        label: "Capture various activities happening in a market",
        trigger: "end",
      },
      { value: 29, label: "Mythical gods like Zeus", trigger: "end" },
      {
        value: 30,
        label: "Drawing that captures different parts of a machine",
        trigger: "end",
      },
      { value: 31, label: "Create a comedy comic of your own", trigger: "end" },
      { value: 32, label: "A cozy room", trigger: "end" },
      { value: 33, label: "Reflection of the sky on water", trigger: "end" },
      {
        value: 34,
        label: "Drawing of older people that you love and the wisdom they emit",
        trigger: "end",
      },
      {
        value: 35,
        label: "The clear sky with the moon and many stars",
        trigger: "end",
      },
      {
        value: 36,
        label: "Drawing of characters from your favorite movie or series",
        trigger: "end",
      },
      {
        value: 37,
        label: "Detailed drawing of a butterfly or any insect that you love",
        trigger: "end",
      },
      {
        value: 38,
        label:
          "Capture the activities happening in a farmhouse focusing on the farm animals",
        trigger: "end",
      },
      { value: 39, label: "Your favorite musicians on stage", trigger: "end" },
      {
        value: 40,
        label: "Turn ordinary objects into something in your imagination",
        trigger: "end",
      },
      { value: 41, label: "Different textures in one drawing", trigger: "end" },
      {
        value: 42,
        label: "Capture activities happening in an aesthetic cafe",
        trigger: "end",
      },
      { value: 43, label: "Brick patterns on a wall", trigger: "end" },
      {
        value: 44,
        label: "Abstract drawing inspired by your favorite song",
        trigger: "end",
      },
      { value: 45, label: "Detailed drawing of a human face", trigger: "end" },
      {
        value: 46,
        label:
          "Drawing capturing the parts of a traditional machine like a cassette player or typewriter",
        trigger: "end",
      },
      {
        value: 47,
        label: "A beautiful garden with beautiful flowers and plants",
        trigger: "end",
      },
      {
        value: 48,
        label: "Showcase all four seasons on one piece of paper",
        trigger: "end",
      },
      {
        value: 49,
        label: "Draw how innocent and happy children are",
        trigger: "end",
      },
      {
        value: 50,
        label: "Various breeds of dogs in one picture",
        trigger: "end",
      },
    ],
  },
  {
    id: "end",
    component: (
      <div>
        Great Choice! Good luck with your drawing!
        <br />
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500"
        >
          End Chat
        </button>
      </div>
    ),
    asMessage: true, // Render the component as a message
    end: true,
  },
];

// Define the theme for the chatbot
const theme = {
  background: "gray",
  headerBgColor: "#F8F8FF",
  headerFontSize: "20px",
  botBubbleColor: "#D3D3D3",
  headerFontColor: "gray",
  botFontColor: "black",
  userBubbleColor: "#B0C4DE",
  userFontColor: "black",
};

// Define the configuration for the chatbot
const config = {
  botAvatar: "/src/assets/images/chatbot.jpg",
  floating: true,
  floatingStyle: { bottom: "60px", right: "20px" }, // Adjust position here
};

// Chatbot component
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chatbotRef = useRef(null);
  const refernceChatBot = useRef(null);

  //   const fixed = () => {
  //     refernceChatBot.current.focus();
  //   };
  const handleClickOutside = (event) => {
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Simulate a loading period. Replace this with actual loading logic.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="App relative">
      {!isLoading && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed h-14 w-14  rounded-full bg-gray-400 justify-center text-center pl-5 right-5 bottom-16   "
        >
          <TbMessageChatbot />
        </button>
      )}
      {isOpen && (
        <div ref={chatbotRef}>
          <ThemeProvider theme={theme}>
            <ChatBot headerTitle="Drawbot" steps={steps} {...config} />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

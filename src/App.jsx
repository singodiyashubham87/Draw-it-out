import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";
import Menu from "./components/Menu";
import BgColor from "./components/BgColor";
import { rainbowColors } from "./utils/helpers";
import Footer from "./components/Footer";
import { FaRegEye, FaRegEyeSlash, FaMoon, FaSun } from "react-icons/fa";
import Joyride from "react-joyride";
import { SiBuymeacoffee } from "react-icons/si";

const tourSteps = [
  {
    target: "body",
    placement: "center",
    title: "Lets Get Started",
    content:
      "Seems like it's your first time here. Follow this quick walkthrough to know how get around. ",
    disableBeacon: true,
  },
  {
    target: ".board",
    content: "Click here to select a tool.",
    disableBeacon: true,
  },
  {
    target: ".color-pallet",
    content: "Select a Color from Here.",
    disableBeacon: true,
  },
  {
    target: "#draw",
    content: "Explore your Inner Picasso here.",
    disableBeacon: true,
  },
  {
    target: "body",
    placement: "center",
    content: "Now All Set :)",
    disableBeacon: true,
  },
];

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(4);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#b7babf");
  const [darkMode, setDarkMode] = useState(null);
  const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);
  const [steps] = useState(tourSteps);

  const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey";

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor);
    }
  }, [thickness, color, bgColor]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <Joyride steps={steps} continuous showSkipButton={true} />

      <div className="bg-[#d3d5d8] flex flex-col min-w-full justify-center gsm:flex-row">
        <div className="container w-[90%] gsm:min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary m-auto gsm:m-0">
          <div className="flex items-center gap-14">
            <Menu
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
              thickness={thickness}
              setThickness={setThickness}
              color={color}
              setColor={setColor}
              canvasRef={canvasRef}
            />

            <div className="flex flex-row justify-center align-center space-x-10">
              <div
                className={`clearAll bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-full shadow-black shadow-md transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-110 ${
                  !showMenuAndBgColor && "mt-10"
                }`}
                onClick={() => {
                  setShowMenuAndBgColor((state) => !state);
                }}
              >
                {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>

              <div
                className={`darkLightModeToggle p-[1rem] text-[1.5rem] rounded-full shadow-md hover:bg-gray-1000 transform transition duration-300 ease-in-out hover:md:scale-110 cursor-pointer bg-black dark:bg-amber-400 shadow-black dark:shadow-black dark:shadow-md ${
                  !showMenuAndBgColor && "mt-10"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? <FaSun className="text-black" /> : <FaMoon className="text-white" />}
              </div>
            </div>
          </div>

          <canvas
            id="draw"
            className={`whiteboard bg-slate-950 rounded-[0.6rem] shadow-md shadow-black dark:shadow-black dark:shadow-lg ${
              isDrawing ? "cursor-crosshair" : "cursor-default pointer-events-none"
            }`}
            ref={canvasRef}
          ></canvas>

          <div
            className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-full shadow-black shadow-vsm dark:shadow-black dark:shadow-lg hover:bg-gray-400 cursor-pointer transform transition duration-300 ease-in-out dark:bg-red-700 dark:text-[#111111]  hover:md:scale-110"
            onClick={() => {
              clearCanvas(canvasRef.current, bgColor);
              setIsDrawing(true);
            }}
          >
            <RxCross1 />
          </div>

          <h1 className="text-[0.7rem] vvsm:text-[1rem] pb-4 dark:text-white ">
            Made with &#128157; by{" "}
            <a
              href="https://shubham-s-socials.vercel.app/"
              className="decoration-none font-semibold hover:underline"
            >
              Master Mickey
            </a>
            !
          </h1>
        </div>

        {showMenuAndBgColor && (
          <div className="color-pallet gsm:w-[10%] w-[85%] py-7 grid grid-cols-6 vsm:grid-cols-4 gsm:grid-cols-1 gap-2 vsm:gap-4 gsm:gap-2 gsm:py-[5rem] gsm:mb-8 mx-auto">
            <input
              type="color"
              name="color"
              id="color"
              title="Color Picker"
              onChange={(e) => setBgColor(e.target.value)}
              className="cursor-pointer m-auto w-[2rem] h-[2rem] vsm:w-[3rem] vsm:h-[3rem] rounded-[0.4rem] border-[0.2px] border-black bg-gradient-to-r from-red-700 via-yellow-600 to-green-600"
            />
            {rainbowColors?.map((val, i) => (
              <BgColor key={i} color={val} setBgColor={setBgColor} canvas={canvasRef.current} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;

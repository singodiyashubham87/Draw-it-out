import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas, handleUpdates } from "./utils/canvas";
import Menu from "./components/Menu";
import BgColor from "./components/BgColor";
import { rainbowColors } from "./utils/helpers";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Joyride from "react-joyride";

const tourSteps = [
  {
    target: "body",
    placement: "center",
    title: "Lets Get Started",
    content:
      "Seems like it’s your first time here. Follow this quick walkthrough to know how get around. ",
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
import { SiBuymeacoffee } from "react-icons/si";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(10);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#B7BABF");
  const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);
  const [steps] = useState(tourSteps);

  const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey"

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor);
      
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      handleUpdates(canvas, color, thickness, bgColor);
    }
  }, [thickness]);

  return (
    <>
      <Joyride steps={steps} continuous showSkipButton={true} />
      
      <div className="bg-[#d3d5d8] flex flex-col min-w-full justify-center gsm:flex-row">
         {/* Buy me a coffee element */}
         <a href={BUY_ME_COFFEE_LINK} target="_blank" rel="noopener noreferrer" className="sm:absolute flex items-center right-10 top-4 relative ml-[90%] sm:ml-0">
            <button className="flex items-center bg-transparent border border-black text-black focus:outline-none bg-[#d4d5d7] hover:bg-[#c6c9ce] rounded-xl p-2">
              <SiBuymeacoffee className="text-xl mx-auto sm:mr-2" /> {/* Icon */}
              <span className="hidden sm:block text-base font-cursive">Buy me a Coffee</span> {/* Text */}
            </button>
          </a>
        {showMenuAndBgColor && (
          <div className="color-pallet gsm:w-[10%] w-[85%] py-7 grid grid-cols-6 vsm:grid-cols-4 gsm:grid-cols-1 gap-2 vsm:gap-4 gsm:gap-2 gsm:py-[5rem] gsm:mb-8 mx-auto">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            // defaultValue={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className={`cursor-pointer m-auto w-[2rem] h-[2rem] vsm:w-[3rem] vsm:h-[3rem]  rounded-[0.4rem] border-[0.2px] border-black bg-gradient-to-r from-red-700 via-yellow-600 to-green-600 `}
          />
            {rainbowColors?.map((val, i) => (
              <BgColor
                key={i}
                color={val}
                setBgColor={setBgColor}
                canvas={canvasRef.current}
              />
            ))}
          </div>
        )}

        <div className="container w-[90%] gsm:min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary m-auto gsm:m-0">
          <div className="flex items-center gap-14">
            {showMenuAndBgColor && (
              <Menu
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
                thickness={thickness}
                setThickness={setThickness}
                color={color}
                setColor={setColor}
                canvasRef={canvasRef}
                bgColor={bgColor}
              />
            )}
            <div
              className={`clearAll bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer ${
                !showMenuAndBgColor && "mt-12"
              }`}
              onClick={() => {
                setShowMenuAndBgColor((state) => !state);
              }}
            >
              {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <canvas
            id="draw"
            className={`whiteboard bg-[#DBDCDF] rounded-[0.6rem] shadow-mdm ${
              isDrawing
                ? "cursor-crosshair"
                : "cursor-default pointer-events-none"
            }`}
            ref={canvasRef}
          ></canvas>
          <div
            className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              clearCanvas(canvasRef.current, "#B7BABF");
              setIsDrawing(true);
            }}
          >
            <RxCross1 />
          </div>
          <h1 className="text-[0.7rem] vvsm:text-[1rem] pb-4">
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
      </div>
    </>
  );
}

export default App;

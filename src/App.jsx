import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegEye, FaRegEyeSlash, FaSun } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Joyride from "react-joyride";
import BgColor from "./components/BgColor";
import Menu from "./components/Menu";
import { handleUpdates, startDrawing } from "./utils/canvas";
import { rainbowColors } from "./utils/helpers";
import { SiBuymeacoffee } from "react-icons/si";
import { tourSteps } from "./utils/helpers";


function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(4);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#b7babf");
  const [darkMode, setDarkMode] = useState(null);
  const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);
  const [steps] = useState(tourSteps);
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey";

  const [brushStyle, setBrushStyle] = useState("solid");
  const [selectedTool, setSelectedTool] = useState("brush");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && !canvasInitialized) {
      setCanvasInitialized(true);
      startDrawing(canvas, color, thickness, bgColor, brushStyle);
      console.log("starting");
      console.log(brushStyle);
    } else if (canvasInitialized) {
      handleUpdates(canvas, color, thickness, bgColor, brushStyle);
    }
  }, [bgColor, color, thickness, canvasInitialized, brushStyle]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <div className="bg-[#CBCCCF] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white transform transition duration-500 ease-in-out font-primary">
        <Joyride
          steps={steps}
          continuous
          showSkipButton={true}
          locale={{
            back: "Back",
            close: "Close",
            last: "Start",
            next: "Next",
            skip: "Skip",
          }}
        />

        <div className=" flex flex-col min-w-full justify-center gsm:flex-row">
          {showMenuAndBgColor && (
            <div className="color-pallet gsm:w-[10%] w-[85%] h-[50rem] p-7 grid grid-cols-6 vsm:grid-cols-4 gsm:grid-cols-1 gap-2 vsm:gap-4 gsm:gap-2 gsm:pb-[5rem] gsm:pt-[14rem] gsm:mb-8 mx-auto">
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
            {/* Buy me a coffee element */}
            <a
              href={BUY_ME_COFFEE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-end mt-4 w-[90%] sm:ml-0"
            >
              <button className="flex items-center bg-transparent border border-black text-black focus:outline-none bg-[#d4d5d7] hover:bg-[#c6c9ce] rounded-xl p-2">
                <SiBuymeacoffee className="text-xl mx-auto sm:mr-2" />{" "}
                {/* Icon */}
                <span className="hidden sm:block text-base font-cursive">
                  Buy me a Coffee
                </span>{" "}
                {/* Text */}
              </button>
            </a>
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
                  setBrushStyle={setBrushStyle}
                  brushStyle={brushStyle}
                  bgColor={bgColor}
                  selectedTool={selectedTool}
                  setSelectedTool={setSelectedTool}
                />
              )}

              <div className="flex flex-row justify-center align-center space-x-10">
                <div
                  className={`clearAll bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-[50%] shadow-black shadow-md  transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-110 ${!showMenuAndBgColor &&
                    "mt-10"}`}
                  onClick={() => {
                    setShowMenuAndBgColor((state) => !state);
                  }}
                >
                  {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>

                <div
                  className={`darkLightModeToggle  p-[1rem] text-[1.5rem] rounded-[50%] shadow-md hover:bg-gray-1000 transform transition duration-300 ease-in-out hover:md:scale-110 cursor-pointer bg-black dark:bg-amber-400 shadow-black dark:shadow-black dark:shadow-md ${!showMenuAndBgColor &&
                    "mt-10"}`}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <FaSun className="text-black" />
                  ) : (
                    <FaMoon className="text-white" />
                  )}
                </div>
              </div>
            </div>
            <canvas
              id="draw"
              className={`whiteboard bg-slate-950 rounded-[0.6rem] shadow-md shadow-black dark:shadow-black dark:shadow-lg ${
                isDrawing
                  ? "cursor-crosshair"
                  : "cursor-default pointer-events-none"
              }
            `}
              ref={canvasRef}
            ></canvas>
            <div
              className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-black shadow-vsm dark:shadow-black dark:shadow-lg hover:bg-gray-400 cursor-pointer transform transition duration-300 ease-in-out dark:bg-red-700 dark:text-[#111111]  hover:md:scale-110"
              onClick={() => {
                setBgColor("#B7BABF");
                setBrushStyle("solid");
                setSelectedTool("brush");
                setCanvasInitialized(false);
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
          <div className="App"></div>
        </div>
      </div>
    </>
  );
}
export default App;

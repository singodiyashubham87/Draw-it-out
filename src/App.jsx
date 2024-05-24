import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegEye, FaRegEyeSlash, FaSun } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Joyride from "react-joyride";
import Menu from "./components/Menu";
import { handleUpdates, startDrawing } from "./utils/canvas";
import { SiBuymeacoffee } from "react-icons/si";
import { tourSteps } from "./utils/helpers";
import BgColorSidePanel from "./components/BgColorSidePanel";

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
      <div className="bg-[#CBCCCF] min-h-screen flex justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white transform transition duration-500 ease-in-out font-primary">
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

        <div className="flex flex-col min-w-full justify-center gsm:flex-row">
          {showMenuAndBgColor && <BgColorSidePanel canvasRef={canvasRef} setBgColor={setBgColor} />}

          <div className="flex flex-col justify-between mt-[2vh] items-center font-primary">
            {/* Drawing Toolbar */}
            <div className="flex items-center">
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
              {/* Toolbar right menu section */}
              <div className="flex md:flex-row flex-col justify-center align-center items-center absolute top-[2vh] right-2">
                {/* Eye button */}
                <div
                  className={`bg-[#CBCCCF] scale-[0.7] p-[1rem] text-[1.5rem] w-80% rounded-[50%] shadow-black shadow-md transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-[0.8] ${
                    !showMenuAndBgColor && "mt-10"
                  }`}
                  onClick={() => {
                    setShowMenuAndBgColor((state) => !state);
                  }}
                >
                  {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>

                {/* Theme Changer */}
                <div
                  className={`p-[1rem] text-[1.5rem] scale-[0.7] rounded-[50%] shadow-md hover:bg-gray-1000 transform transition duration-300 ease-in-out hover:md:scale-[0.8] cursor-pointer bg-black dark:bg-amber-400 shadow-black dark:shadow-black dark:shadow-md ${
                    !showMenuAndBgColor && "mt-10"
                  }`}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <FaSun className="text-black" /> : <FaMoon className="text-white" />}
                </div>

                {/* Buy me a coffee */}
                <a
                  href={BUY_ME_COFFEE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-end sm:ml-0"
                >
                  <button className="flex mt-2 mb-2 items-center ml-1 mr-1 bg-transparent border border-black text-black focus:outline-none bg-[#d4d5d7] hover:bg-[#c6c9ce] rounded-xl p-2">
                    <SiBuymeacoffee className="text-xl" />
                  </button>
                </a>
              </div>
            </div>

            {/* ----- Canvas ------ */}
            <canvas
              id="draw"
              className={`whiteboard bg-slate-950 w-screen mt-[4vh] rounded-[0.6rem] shadow-md shadow-black dark:shadow-black dark:shadow-lg ${
                isDrawing ? "cursor-crosshair" : "cursor-default pointer-events-none"
              }
            `}
              ref={canvasRef}
            ></canvas>

            <div
              className="bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-black shadow-vsm dark:shadow-black dark:shadow-lg hover:bg-gray-400 cursor-pointer transform transition duration-300 ease-in-out dark:text-[#111111]  hover:md:scale-110"
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

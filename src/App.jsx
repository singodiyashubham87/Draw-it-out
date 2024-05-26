import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegEye, FaRegEyeSlash, FaSun } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { tourSteps } from "./utils/helpers";
import BgColorSidePanel from "./components/BgColorSidePanel";
import Menu from "./components/Menu";
import { handleUpdates, startDrawing } from "./utils/canvas";
import { FaBookOpen } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import { TbFileTypeSvg } from "react-icons/tb";
import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import Joyride from "react-joyride";
import { SiBuymeacoffee } from "react-icons/si";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(4);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#b7babf");
  const [darkMode, setDarkMode] = useState(null);
  const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);
  const [steps] = useState(tourSteps);
  const [modal, setModal] = useState(false);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [brushStyle, setBrushStyle] = useState("solid");
  const [selectedTool, setSelectedTool] = useState("brush");

  const style = {
    guideline: `p-4 flex text-xs`,
  };

  const showGuidelines = () => {
    setModal(!modal);
  };
  const closeModal = () => {
    setModal(false);
  };

  const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey";

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
      <div className="relative ">
        <div className="flex flex-col justify-center text-center items-center bg-gray-800 dark:bg-black pb-8 pt-8">
          <h1 className="font-['Love_Ya_Like_A_Sister',cursive] text-4xl text-slate-200 p-2">
            Draw it Out!
          </h1>
          <p className="text-gray-500 text-xs">All you need is a canvas to craft your ideas.</p>
        </div>

        <button className="absolute top-0 left-0 p-6">
          <FaBookOpen
            size={28}
            color="white"
            className="bg-black p-1 rounded-xl"
            aria-label="show-guidelines"
            onClick={showGuidelines}
          />
        </button>
      </div>
      <div className="bg-[#d3d4d9] dark:bg-black pb-3"></div>
      <div className="bg-[#CBCCCF] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white transform transition duration-500 ease-in-out">
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
      </div>
      {/* Buy me a coffee element */}
      <div className="bg-[#d3d5d8] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white">
        <div className="flex flex-col min-w-full justify-center gsm:flex-row">
          {showMenuAndBgColor && <BgColorSidePanel canvasRef={canvasRef} setBgColor={setBgColor} />}

          <div className="relative flex flex-col justify-between mt-[0.5vh] items-center font-primary">
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
              <div className="flex md:flex-row flex-col justify-center align-center items-center absolute top-0 md:right-4 right-2">
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
            <h1 className="text-[0.7rem] vvsm:text-[1rem] pb-4 dark:text-white">
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
          <div
            className={
              modal
                ? "z-20 fixed right-3 top-5 w-[300px] h-[500px] bg-gray-100"
                : "fixed right-[-100%]"
            }
            onClick={showGuidelines}
          >
            <VscClose
              size={20}
              color="white"
              onClick={closeModal}
              className="bg-black rounded-xl p-1 absolute top-4 right-4 cursor-pointer"
            />
            <ul className="pt-18 p-4">
              <li className="p-2 font-bold text-lg uppercase">Guidelines</li>
              <li className={style.guideline}>
                <PiPencilSimpleFill />
                <span className="ml-2">Draw your heart out using the pen.</span>
              </li>
              <li className={style.guideline}>
                <FaFeatherPointed />
                <span className="ml-2"> Use a light touch for delicate lines.</span>
              </li>
              <li className={style.guideline}>
                <RiScreenshot2Fill />
                <span className="ml-2"> Capture your screen for reference.</span>
              </li>
              <li className={style.guideline}>
                <FaFilePdf />{" "}
                <span className="ml-2">Export your work as a PDF for easy sharing.</span>
              </li>
              <li className={style.guideline}>
                <TbFileTypeSvg />
                <span className="ml-2"> Save your artwork as an SVG for scalability.</span>
              </li>
              <li className={style.guideline}>
                <PiPlus />
                <span className="ml-2"> Zoom in to work on finer details.</span>
              </li>
              <li className={style.guideline}>
                <PiMinus />
                <span className="ml-2"> Zoom out for an overview of your drawing.</span>
              </li>
              <li className={style.guideline}>
                <FaRegEye />
                <span className="ml-2">View only your canvas.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

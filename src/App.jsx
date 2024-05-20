import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas, handleUpdates } from "./utils/canvas";
import Menu from "./components/Menu";
import BgColor from "./components/BgColor";
import { rainbowColors } from "./utils/helpers";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import {FaFilePdf} from 'react-icons/fa'
import { TbFileTypeSvg } from "react-icons/tb";
import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import { FaMoon, FaSun } from "react-icons/fa";
import Joyride from "react-joyride";

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
  const [modal,setModal]=useState(false)
  const style={
    guideline:`p-4 flex text-xs`,
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor);
    }
  }, [bgColor, color, thickness]);
  const showGuidelines=()=>{
    setModal(!modal)
  }
  const closeModal=()=>{
    setModal(false)
  }
  
  const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey"

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      handleUpdates(canvas, color, thickness, bgColor);
    }
      }, [thickness]);
  
  const [brushStyle, setBrushStyle] = useState('solid');

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor,brushStyle);
    }

  }, [thickness,color, bgColor,brushStyle]);



  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark')
  };


  return (
    <>

    <div className="relative">
      <div className="flex flex-col justify-center text-center items-center bg-gray-800 pb-8 pt-8">
        <h1 className="headingfont text-4xl font-bold text-slate-100 p-2">Draw it Out!</h1>
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

      <a href={BUY_ME_COFFEE_LINK} target="_blank" rel="noopener noreferrer" className="absolute top-0 right-0 p-6">
        <button className="flex items-center bg-transparent border border-slate-200 text-white focus:outline-none  hover:bg-slate-900 hover:text-white rounded-xl p-2">
          <SiBuymeacoffee className="text-xl mx-auto sm:mr-2" />
          <span className="hidden sm:block text-base text-white font-cursive">Buy me a Coffee</span>
        </button>
      </a>
    </div>
      <div className="bg-[#CBCCCF] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white transform transition duration-500 ease-in-out">
      <Joyride
        steps={steps}
        continuous
        showSkipButton={true}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Start',
          next: 'Next',
          skip: 'Skip',
  }}
/>


      <div className="bg-[#d3d5d8] flex flex-col min-w-full justify-center gsm:flex-row">
                  {/* Buy me a coffee element */}
        
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
              setBrushStyle={setBrushStyle}
              brushStyle={brushStyle}
              />
            )}

            <div
              className = "flex flex-row justify-center align-center space-x-10"
            >
              <div
              className={`clearAll bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-[50%] shadow-black shadow-md  transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-110 ${
                !showMenuAndBgColor && "mt-10"
              }`}
              onClick={() => {
                setShowMenuAndBgColor((state) => !state);
              }}
            >
              {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>

            <div
              className={`darkLightModeToggle  p-[1rem] text-[1.5rem] rounded-[50%] shadow-md hover:bg-gray-1000 transform transition duration-300 ease-in-out hover:md:scale-110 cursor-pointer bg-black dark:bg-amber-400 shadow-black dark:shadow-black dark:shadow-md ${!showMenuAndBgColor && "mt-10"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun className="text-black" /> : <FaMoon className="text-white" />}
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
              clearCanvas(canvasRef.current,bgColor);
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
        <div className={modal ? 'z-20 fixed right-3 top-5 w-[300px] h-[500px] bg-gray-100': 'fixed right-[-100%]'} onClick={showGuidelines} >
        <VscClose
              size={20}
              color="white"
              onClick={closeModal}
              className="bg-black rounded-xl p-1 absolute top-4 right-4 cursor-pointer"
            />
            <ul className='pt-18 p-4'>
              <li className='p-2 font-bold text-lg uppercase'>Guidelines</li>
              <li className={style.guideline}><PiPencilSimpleFill/><span className="ml-2">Draw your heart out using the pen.</span></li>
              <li className={style.guideline}><FaFeatherPointed/><span className="ml-2"> Use a light touch for delicate lines.</span></li>
              <li className={style.guideline}><RiScreenshot2Fill/><span className="ml-2"> Capture your screen for reference.</span></li>
              <li className={style.guideline}><FaFilePdf/> <span className="ml-2">Export your work as a PDF for easy sharing.</span></li>
              <li className={style.guideline}><TbFileTypeSvg/><span className="ml-2"> Save your artwork as an SVG for scalability.</span></li>
              <li className={style.guideline}><PiPlus/><span className="ml-2"> Zoom in to work on finer details.</span></li>
              <li className={style.guideline}><PiMinus/><span className="ml-2"> Zoom out for an overview of your drawing.</span></li>
              <li className={style.guideline}><FaRegEye/><span className="ml-2">View only your canvas.</span></li>
            </ul>
        </div>
      </div>
    </div>
  </>
  )
};
export default App;
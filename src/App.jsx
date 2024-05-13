import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";
import Menu from "./components/Menu";
import BgColor from "./components/BgColor";
import { rainbowColors } from "./utils/helpers";
import { FaRegEye, FaRegEyeSlash, FaMoon, FaSun } from "react-icons/fa";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(10);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#B7BABF");
  const [darkMode, setDarkMode] = useState(null);
  const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor);
    }
  }, [bgColor, color, thickness]);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark')
  };
  

  return (
    <>
      <div className="bg-[#CBCCCF] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-black dark:text-white ">
        {showMenuAndBgColor && (
          <div className="gsm:w-[10%] w-[85%] py-7 grid grid-cols-6 vsm:grid-cols-4 gsm:grid-cols-1 gap-2 vsm:gap-4 gsm:gap-2 gsm:py-[5rem] gsm:mb-8 mx-auto">
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

        <div className="container w-[90%] gsm:min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary m-auto gsm:m-0 dark:text-black">
          <div className="flex items-center gap-14 shadow-black">
            {showMenuAndBgColor && (
              <Menu
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
                thickness={thickness}
                setThickness={setThickness}
                color={color}
                setColor={setColor}
                canvasRef={canvasRef}
                showMenuAndBgColor={showMenuAndBgColor}
                setShowMenuAndBgColor={setShowMenuAndBgColor}
              />
            )}

            <div
              className = "flex flex-row justify-center align-center space-x-10"
            >
              <div
              className={`clearAll bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-[50%] shadow-black shadow-lg dark:shadow-white dark:shadow-sm hover:bg-gray-400 cursor-pointer ${
                !showMenuAndBgColor && "mt-10"
              }`}
              onClick={() => {
                setShowMenuAndBgColor((state) => !state);
              }}
            >
              {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>

            <div
              className={`darkLightModeToggle bg-[#CBCCCF] p-[1rem] text-[1.5rem] rounded-[50%] shadow-md hover:bg-gray-400 cursor-pointer dark:bg-black shadow-black shadow-lg dark:shadow-white dark:shadow-sm ${!showMenuAndBgColor && "mt-10"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-black" />}
            </div>
            </div>
          </div>
          <canvas
            id="draw"
            className={`whiteboard bg-[#DBDCDF] rounded-[0.6rem] shadow-lg shadow-black dark:shadow-white dark:shadow-lg ${
              isDrawing
                ? "cursor-crosshair"
                : "cursor-default pointer-events-none"
            }`}
            ref={canvasRef}
          ></canvas>
          <div
            className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-black shadow-lg dark:shadow-white dark:shadow-md hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              clearCanvas(canvasRef.current, bgColor);
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
      </div>
    </>
  );
}

export default App;

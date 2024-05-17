/* eslint-disable react/prop-types */
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import {FaFilePdf} from 'react-icons/fa'
import { TbFileTypeSvg } from "react-icons/tb";
import { useState } from "react";
import { takeSnapshot,convertToPDF,convertToSVG } from "../utils/canvas.js";

import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import { increaseHeight } from "../utils/canvas.js";
import { decreaseHeight } from "../utils/canvas.js";
// import BgColor from "./BgColor.jsx";

const Menu = ({
  isDrawing,
  setIsDrawing,
  thickness,
  setThickness,
  color,
  setColor,
  canvasRef,
  bgColor,
  height,
  handleheight
}) => {
  const [pencilWidth, setPencilWidth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const toggleIsDrawing = () => {
    setIsDrawing(!isDrawing);
  };
  return (
    <>
      <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm shadow-black flex justify-center   items-center gap-[1rem] md:gap-[3rem] px-[2rem] pt-6 pb-10 rounded-[0.6rem] dark:shadow-white dark:shadow-md ">
        <button className=" relative">
        <PiPencilSimpleFill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm rounded-[0.5rem] text-black cursor-pointer dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out hover:bg-[#B7BABF] dark:hover:bg-gray-800 ${
            isDrawing ? "bg-gray-400" : ""
          }`}
          onClick={toggleIsDrawing}
          title="Draw"
          />
          <span className=" absolute left-0  top-14 ">Pencil</span>
        </button>
        <button className="relative">
        <FaFeatherPointed
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm mx-auto rounded-[0.5rem] text-black dark:bg-[#111111] dark:text-[#ffffff] cursor-pointer hover:bg-[#B7BABF]transform transition duration-300 ease-in-out ${
            pencilWidth ? "bg-gray-200" : ""
          }`}
          onClick={() => setPencilWidth(!pencilWidth)}
          title="Brush Thickness"
          />
          <span className=" absolute -left-3 top-14">Thickness</span>
          
        </button>
        
        {pencilWidth && (
          <input
            type="range"
            name="thickness"
            id="thickness"
            value={thickness || 10}
            min={1}
            max={100}
            onChange={(e) => {
              setThickness(e.target.value);
            }}
              
            className="cursor-pointer"
          />
        )}
        <div className="py-[1rem] px-[1.5rem] rounded-[0.5rem] w-12 h-12 relative shadow-black shadow-vsm hover:bg-[#B7BABF] text-black text-blackcursor-pointer">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            onChange={(e) => setColor(e.target.value)}
            className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0 dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out `}
          />
        <span className="absolute top-14 left-[0.3rem]">Color</span>
        </div>
        <div className="relative">
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-gray-700 bg-[#B7BABF] focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out "
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Save As
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <div
            id="dropdownHover"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`absolute z-10 ${isOpen ? '' : 'hidden'} divide-y bg-[#CBCCCF] rounded-lg shadow w-48 top-[3.1rem] `}
          >
            <ul className="text-sm text-gray-700 flex space-x-3 p-3 justify-center  " aria-labelledby="dropdownHoverButton">
              <li>
                <RiScreenshot2Fill
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] dark:bg-[#111111] dark:text-[#ffffff]  `}
                  onClick={() => takeSnapshot(canvasRef.current, color)}
                  title="Snapshot"
                />
              </li>
              <li>
                <FaFilePdf 
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] dark:bg-[#111111] dark:text-[#ffffff]  `}
                  onClick={()=>convertToPDF(canvasRef.current)}
                  title="PDF"
                />
              </li>
              <li>
                <TbFileTypeSvg
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] dark:bg-[#111111] dark:text-[#ffffff]  `}
                  onClick={()=>convertToSVG(canvasRef.current)}
                  title="SVG"
                />
              </li>
            </ul>
          </div>
        </div>
        <button>
          <PiPlus
            onClick={() => handleheight(height<100?height+5:height)}
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer hover:bg-[#B7BABF] dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out `}
            title="IncreaseHeight"
          />
        </button>
        <button>
          <PiMinus
            onClick={() => handleheight(height>70?height-5:height)}
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer hover:bg-[#B7BABF] dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out `}
            title="DecreaseHeight"
          />
        </button>
      </div>
    </>
  );
};

export default Menu;

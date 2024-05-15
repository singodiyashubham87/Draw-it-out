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
      <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm shadow-black flex justify-center items-stretch gap-[1rem] md:gap-[2rem] px-[2rem] py-4 rounded-[0.6rem] dark:shadow-white dark:shadow-md">
        <button>
        <PiPencilSimpleFill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
            isDrawing ? "bg-gray-400" : ""
          }`}
          onClick={toggleIsDrawing}
          title="Draw"
        />
        </button>
        <button>
        <FaFeatherPointed
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
            pencilWidth ? "bg-gray-400" : ""
          }`}
          onClick={() => setPencilWidth(!pencilWidth)}
          title="Brush Thickness"
        />
          
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
        <div className="p-[1rem] px-[1.5rem] rounded-[0.5rem] relative shadow-black shadow-vsm hover:bg-[#B7BABF] cursor-pointer">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            onChange={(e) => setColor(e.target.value)}
            className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0`}
          />
        </div>
        <div className="relative">
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-gray-700 bg-[#B7BABF] focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center"
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
            className={`absolute z-10 ${isOpen ? '' : 'hidden'} divide-y bg-[#CBCCCF] rounded-lg shadow w-48 top-[3.1rem]`}
          >
            <ul className="text-sm text-gray-700 flex space-x-3 p-3 justify-center" aria-labelledby="dropdownHoverButton">
              <li>
                <RiScreenshot2Fill
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={() => takeSnapshot(canvasRef.current, color)}
                  title="Snapshot"
                />
              </li>
              <li>
                <FaFilePdf 
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={()=>convertToPDF(canvasRef.current)}
                  title="PDF"
                />
              </li>
              <li>
                <TbFileTypeSvg
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={()=>convertToSVG(canvasRef.current)}
                  title="SVG"
                />
              </li>
            </ul>
          </div>
        </div>
        <button>
          <PiPlus
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
            onClick={() => increaseHeight(canvasRef.current, bgColor)}
            title="IncreaseHeight"
          />
        </button>
        <button>
          <PiMinus
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
            onClick={() => decreaseHeight(canvasRef.current, bgColor)}
            title="DecreaseHeight"
          />
        </button>
      </div>
    </>
  );
};

export default Menu;

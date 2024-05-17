/* eslint-disable react/prop-types */
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";

import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import { useState } from "react";
import { takeSnapshot } from "../utils/canvas.js";

const Menu = ({
  isDrawing,
  setIsDrawing,
  thickness,
  setThickness,
  color,
  setColor,
  canvasRef,
  setBrushStyle,
  brushStyle
}) => {
  const [pencilWidth, setPencilWidth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleIsDrawing = () => {
    setIsDrawing(!isDrawing);
  };
  const handleBrushStyleChange = (style) => {
    setBrushStyle(style);
    setIsDropdownOpen(false); // Close the dropdown after selecting a style
  };
  return (
    <>
      <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm flex justify-center items-stretch gap-[1rem] md:gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
      <div className="relative">
      <PiPencilSimpleFill
        className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
          isDropdownOpen ? "bg-gray-400" : ""
        }`}
        onClick={toggleDropdown}
        title="Draw"
      />
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-md ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        {/* Dropdown content */}
        <div className="py-2">
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "solid" ? "font-bold" : ""
            }`}
            onClick={() => handleBrushStyleChange("solid")}
          >
            Solid
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "dotted" ? "font-bold" : ""
            }`}
            onClick={() => handleBrushStyleChange("dotted")}
          >
            Dotted
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "dashed" ? "font-bold" : ""
            }`}
            onClick={() => handleBrushStyleChange("dashed")}
          >
            Dashed
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "faded" ? "font-bold" : ""
            }`}
            onClick={() => handleBrushStyleChange("faded")}
          >
            Faded
          </button>
        </div>
      </div>
      {/* Arrow */}
      <FaChevronDown
        className={`absolute top-full left-1/2 transform -translate-x-1/2 text-gray-600 ${
          isDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </div>
        <FaFeatherPointed
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${pencilWidth ? "bg-gray-400" : ""
            }`}
          onClick={() => setPencilWidth(!pencilWidth)}
          title="Brush Thickness"
        />
        {pencilWidth && (
          <input
            type="range"
            name="thickness"
            id="thickness"
            value={thickness || 10}
            min={1}
            max={100}
            onChange={(e) => setThickness(e.target.value)}
            className="cursor-pointer"
          />
        )}
        <div className="p-[1rem] px-[1.5rem] rounded-[0.5rem] relative shadow-vsm hover:bg-[#B7BABF] cursor-pointer">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            onChange={(e) => setColor(e.target.value)}
            className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0`}
          />
        </div>
        <RiScreenshot2Fill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
          onClick={() => takeSnapshot(canvasRef.current, color)}
          title="Snapshot"
        />
      </div>
    </>
  );
};

export default Menu;

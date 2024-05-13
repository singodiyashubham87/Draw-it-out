/* eslint-disable react/prop-types */
import { PiPencilSimpleFill } from "react-icons/pi";
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
}) => {
  const [pencilWidth, setPencilWidth] = useState(false);

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
            onChange={(e) => setThickness(e.target.value)}
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
        <button>
        <RiScreenshot2Fill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
          onClick={() => takeSnapshot(canvasRef.current, color)}
          title="Snapshot"
        /></button>
      </div>
    </>
  );
};

export default Menu;

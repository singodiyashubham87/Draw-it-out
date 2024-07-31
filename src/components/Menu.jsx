/* eslint-disable react/prop-types */
import { PiPencilSimpleFill, PiPlus, PiMinus } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { TbFileTypeSvg } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

import { BiSolidPolygon } from "react-icons/bi";
import { BiPolygon } from "react-icons/bi";
import { BiArea } from "react-icons/bi";
import { increaseHeight, decreaseHeight, changeAspect} from "../utils/canvas.js";

import {
  convertToPDF,
  convertToSVG,
  convertToJPG,
  convertToPng,
} from "../utils/canvas.js";

import DrawingShapes from "./DrawingShapes.jsx";


function Brush(props) {
  const {
    isDropdownOpen,
    toggleDropdown,
    setBrushStyle,
    setIsDropdownOpen,
    brushStyle,
    isVisible,
    toggleVisible,
    setSelectedTool,
  } = props;
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <PiPencilSimpleFill
        className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer text-black bg-[#CBCCCF] hover:bg-[#B7BABF] ${isDropdownOpen ? "bg-gray-400" : ""
          } ${isVisible ? "bg-gray-400" : ""}`}
        onClick={() => {
          toggleDropdown();
          toggleVisible();
          setSelectedTool("brush");
        }}
        title="Draw"
      />
      <div
        className={`absolute top-full bg-[#CBCCCF] mx-auto rounded-[0.5rem] left-1/2 transform -translate-x-1/2 ${isDropdownOpen ? "block" : "hidden"
          }`}
      >
        {/* Dropdown content */}
        <div className={`py-2 bg-[#CBCCCF] text-black`}>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${brushStyle === "solid" ? "font-bold" : ""
              }`}
            onClick={() => {
              setBrushStyle("solid");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Solid
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${brushStyle === "dotted" ? "font-bold" : ""
              }`}
            onClick={() => {
              setBrushStyle("dotted");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Dotted
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${brushStyle === "dashed" ? "font-bold" : ""
              }`}
            onClick={() => {
              setBrushStyle("dashed");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Dashed
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${brushStyle === "faded" ? "font-bold" : ""
              }`}
            onClick={() => {
              setBrushStyle("faded");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Faded
          </button>
        </div>
      </div>
    </div>
  );
}

const Menu = ({
  thickness,
  setThickness,
  color,
  setColor,
  canvasRef,
  setBrushStyle,
  brushStyle,
  selectedTool,
  setSelectedTool,
}) => {
  const [pencilWidth, setPencilWidth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fillColor, setFillColor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [bgColor, setBgColor] = useState('bg-slate-950');
  const [isAspectDropOpen, setAspectDropOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isVisible) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const toggleAspectDrop = () => {
    setAspectDropOpen(!isAspectDropOpen); 
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const toggleSaveAs = () => {
    setIsOpen(!isOpen);
  };
  
  const handleBrushStyleChange = (style) => {
    setBrushStyle(style);
    setIsDropdownOpen(false); // Close the dropdown after selecting a style
  };

  const aspectDropRef = useRef(null);

  const handleOutClick = (event) => {
    if (aspectDropRef.current && !aspectDropRef.current.contains(event.target)) {
      setAspectDropOpen(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutClick);
  //   };
  // }, [isAspectDropOpen]);

  return (
    <>
      <div id="toolbar" className="md:scale-[0.7] lg:scale-[0.8] scale-[0.8] max-w-[100%] bg-[#CBCCCF] shadow-mdm dark:bg-[#111111] flex flex-row justify-center md:justify-start lg:justify-center items-center gap-[1rem] px-[1rem] pt-2 pb-2 rounded-[0.6rem] flex-wrap">
        <Brush
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          setBrushStyle={setBrushStyle}
          setIsDropdownOpen={setIsDropdownOpen}
          brushStyle={brushStyle}
          isVisible={isVisible}
          toggleVisible={toggleVisible}
          setSelectedTool={setSelectedTool}
        />
        <DrawingShapes
          brushWidth={thickness}
          selectedColor={color}
          fillColor={fillColor}
          canvasRef={canvasRef}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        {/* Shape fill mode */}
        <button
          className="flex flex-col items-center"
          onClick={() => setFillColor(!fillColor)}
        >
          {fillColor ? (
            <BiSolidPolygon
              className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#CBCCCF] hover:bg-[#B7BABF] transform transition duration-300 ease-in-out`}
            />
          ) : (
            <BiPolygon
              className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#CBCCCF] hover:bg-[#B7BABF] transform transition duration-300 ease-in-out`}
            />
          )}
        </button>

        <div className="flex flex-col relative">
          <button className="relative">
            <FaFeatherPointed
              className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm mx-auto rounded-[0.5rem] text-black bg-[#CBCCCF] cursor-pointer hover:bg-[#B7BABF] transform transition duration-300 ease-in-out ${isVisible ? "block" : "hidden"
                } ${pencilWidth ? "bg-gray-200" : ""}`}
              onClick={() => {
                setPencilWidth(!pencilWidth);
                setSelectedTool("brush");
              }}
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
              className={`cursor-pointer absolute bottom-[-40px] ${isVisible ? "block" : "hidden"
                }`}
            />
          )}
        </div>
        <div className="py-[1rem] px-[1.5rem] rounded-[0.5rem] w-12 h-12 relative shadow-vsm hover:bg-[#B7BABF] text-black cursor-pointer">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            onChange={(e) => setColor(e.target.value)}
            className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0 transform transition duration-300 ease-in-out`}
          />
          <span className="absolute top-14 left-[0.3rem] dark:text-[#ffffff]">
            {/* Color */}
          </span>
        </div>
        <div className="relative">
          <button
            className="text-gray-700 bg-[#B7BABF] focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center transform transition duration-300 ease-in-out"
            type="button"
            onClick={toggleSaveAs}
          >
            {/* Save As */}
            <IoCloudDownloadOutline />
            <svg
              className={`w-2.5 h-2.5 ms-3 ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            className={`absolute z-10 ${isOpen ? "" : "hidden"
              } divide-y bg-[#CBCCCF] rounded-lg shadow w-59 top-[3.1rem] `}
          >
            <ul
              className="text-sm text-gray-700 flex space-y-5 md:space-x-5 p-5 justify-center items-center flex flex-col md:flex-row"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <button
                  className={`text-[1rem] md:text-[1rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] md:mt-4 cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={() => convertToPng(canvasRef.current)}
                  title="toPNG"
                >
                  <p>PNG</p>
                </button>
              </li>

              <li>
                <button
                  className={`text-[1rem] md:text-[1rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={() => convertToJPG(canvasRef.current)}
                  title="ToJPG"
                >
                  <p>JPG</p>
                </button>
              </li>
              <li>
                <FaFilePdf
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
                  onClick={() => convertToPDF(canvasRef.current)}
                  title="PDF"
                />
              </li>
              <li>
                <TbFileTypeSvg
                  className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-mdm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]  `}
                  onClick={() => convertToSVG(canvasRef.current)}
                  title="SVG"
                />
              </li>
            </ul>
          </div>
        </div>
        <button>
          <PiPlus
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#c5c5c9] hover:bg-[#B7BABF]  transform transition duration-300 ease-in-out `}
            onClick={() =>
              increaseHeight(
                canvasRef.current,
                setBgColor,
                thickness,
                color,
                brushStyle
              )
            }
            title="IncreaseHeight"
          />
        </button>
        <button>
          <PiMinus
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#c5c5c9] hover:bg-[#B7BABF]  transform transition duration-300 ease-in-out `}
            onClick={() =>
              decreaseHeight(
                canvasRef.current,
                bgColor,
                thickness,
                color,
                brushStyle
              )
            }
            title="DecreaseHeight"
          />
        </button>
        <div className="relative inline-">
        <button onClick={toggleAspectDrop} ref={aspectDropRef}>
        <BiArea
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#CBCCCF] hover:bg-[#B7BABF] transform transition duration-300 ease-in-out`}
          title="Canvas Size"
        />
      </button>
      <div className={`absolute left-0 w-auto bg-[#CBCCCF] rounded-[0.5rem] mt-2 ${isAspectDropOpen ? "block" : "hidden"}`}>
        <div className={`py-2 bg-[#CBCCCF] w-auto`}>
          <button className={`block px-4 py-2 text-left hover:bg-gray-200 w-full dark:text-black dark:hover:bg-##3a3838`}
            onClick={() => { toggleAspectDrop(); changeAspect(canvasRef.current, bgColor, thickness, color, brushStyle, 50, 80)}}>
            16:9
          </button>

          <button className={`block px-4 py-2 text-left hover:bg-gray-200 w-full dark:text-black dark:hover:bg-##3a3838`}
            onClick={() => { toggleAspectDrop(); changeAspect(canvasRef.current, bgColor, thickness, color, brushStyle, 70, 50)}}>
            9:16         
          </button>
          <button className={`block px-4 py-2 text-left hover:bg-gray-200 w-full dark:text-black dark:hover:bg-##3a3838`}
            onClick={() => { toggleAspectDrop(); changeAspect(canvasRef.current, bgColor, thickness, color, brushStyle, 50, 60)}}>
            1:1
          </button>
          <button className={`block px-4 py-2 text-left hover:bg-gray-200 w-full dark:text-black dark:hover:bg-##3a3838`}
            onClick={() => { toggleAspectDrop(); changeAspect(canvasRef.current, bgColor, thickness, color, brushStyle, 100, 100)}}>
            Default
          </button>
          {/* <button className={`block px-4 py-2 text-left hover:bg-gray-200 w-full dark:text-black dark:hover:bg-##3a3838`}
            onClick={() => { toggleAspectDrop(); changeAspect(canvasRef.current, bgColor, thickness, color, brushStyle, x, y)}}>
            Add more options for aspect ratio 
          </button> */}
        </div>
      </div>
      </div>
      </div>
    </>
  );
};
export default Menu;

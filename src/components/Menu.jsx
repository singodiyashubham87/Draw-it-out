import { useState, useRef, useEffect } from "react";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { TbFileTypeSvg } from "react-icons/tb";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BiSolidPolygon } from "react-icons/bi";
import { BiPolygon } from "react-icons/bi";

import { convertToPDF, convertToSVG, convertToJPG, convertToPng, importImage } from "../utils/canvas.js";
import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import { increaseHeight, decreaseHeight } from "../utils/canvas.js";
import DrawingShapes from "./DrawingShapes.jsx";

function Brush(props) {
  const { isDropdownOpen, toggleDropdown, setBrushStyle, setIsDropdownOpen, brushStyle } = props;
  return (
    <div className="relative ">
      <PiPencilSimpleFill
        className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer text-black bg-[#CBCCCF] hover:bg-[#B7BABF] ${
          isDropdownOpen ? "bg-gray-400" : ""
        }`}
        onClick={toggleDropdown}
        title="Draw"
      />
      <div
        className={`absolute top-full bg-[#CBCCCF] mx-auto rounded-[0.5rem] left-1/2 transform -translate-x-1/2 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <div className="py-2 bg-[#CBCCCF] ">
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "solid" ? "font-bold" : ""
            }`}
            onClick={() => {
              setBrushStyle("solid");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Solid
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "dotted" ? "font-bold" : ""
            }`}
            onClick={() => {
              setBrushStyle("dotted");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Dotted
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "dashed" ? "font-bold" : ""
            }`}
            onClick={() => {
              setBrushStyle("dashed");
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Dashed
          </button>
          <button
            className={`block px-4 py-2 text-left hover:bg-gray-200 w-full ${
              brushStyle === "faded" ? "font-bold" : ""
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
  bgColor,
  brushStyle,
  selectedTool,
  setSelectedTool,
}) => {
  const [pencilWidth, setPencilWidth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fillColor, setFillColor] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageWidth, setImageWidth] = useState(500);
  const [imageHeight, setImageHeight] = useState(500);
  const [isImporting, setIsImporting] = useState(false);
  const inputFileRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSaveAs = () => {
    setIsOpen(!isOpen);
  };

  const handleBrushStyleChange = (style) => {
    setBrushStyle(style);
    setIsDropdownOpen(false); // Close the dropdown after selecting a style
  };

  const handleImportImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      importImage(canvasRef.current, file, imageWidth, imageHeight);
    }
  };

  const handleImportButtonClick = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    if (imageFile) {
      importImage(canvasRef.current, imageFile, imageWidth, imageHeight);
    }
  }, [imageWidth, imageHeight]);

  return (
    <>
      <div className="scale-[0.8] max-w-[100%] bg-[#CBCCCF] shadow-mdm dark:bg-[#111111] flex justify-center items-center gap-[1rem] px-[1rem] pt-2 pb-2 rounded-[0.6rem]">
        <Brush
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          setBrushStyle={setBrushStyle}
          setIsDropdownOpen={setIsDropdownOpen}
          brushStyle={brushStyle}
        />
        <DrawingShapes
          brushWidth={thickness}
          selectedColor={color}
          fillColor={fillColor}
          canvasRef={canvasRef}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        <button className="flex flex-col items-center" onClick={(e) => setFillColor(!fillColor)}>
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
              className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm mx-auto rounded-[0.5rem] text-black bg-[#CBCCCF] cursor-pointer hover:bg-[#B7BABF] transform transition duration-300 ease-in-out ${
                pencilWidth ? "bg-gray-200" : ""
              }`}
              onClick={() => setPencilWidth(!pencilWidth)}
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
              className="cursor-pointer absolute bottom-[-40px]"
            />
          )}
        </div>
        <div className="py-[1rem] px-[1.5rem] rounded-[0.5rem] w-12 h-12 relative  shadow-vsm hover:bg-[#B7BABF] text-black cursor-pointer">
          <input
            type="color"
            name="color"
            id="color"
            title="Color Picker"
            onChange={(e) => setColor(e.target.value)}
            className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0 transform transition duration-300 ease-in-out `}
          />
          <span className="absolute top-14 left-[0.3rem] dark:text-[#ffffff]"></span>
        </div>
        
        {/* Import button */}
        <div className="relative">
          <button
            className={`text-gray-700 bg-[#B7BABF] focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center transform transition duration-300 ease-in-out ${
              isImporting ? "bg-gray-400" : ""
            }`}
            type="button"
            onClick={() => {
              setIsImporting(!isImporting);
              if (!isImporting) handleImportButtonClick();
            }}
          >
            {isImporting ? "Importing..." : "Import"}
          </button>
          <input
            type="file"
            onChange={handleImportImage}
            ref={inputFileRef}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        {/* Width and Height inputs */}
        {isImporting && (
          <>
            <input
              type="number"
              className="ml-2 bg-[#CBCCCF] text-gray-700 p-1 rounded"
              placeholder="Width"
              value={imageWidth}
              onChange={(e) => setImageWidth(parseInt(e.target.value))}
            />

            <input
              type="number"
              className="ml-2 bg-[#CBCCCF] text-gray-700 p-1 rounded"
              placeholder="Height"
              value={imageHeight}
              onChange={(e) => setImageHeight(parseInt(e.target.value))}
            />
          </>
        )}

        {/* Save as dropdown */}
        <div className="relative">
          <button
            className="text-gray-700 bg-[#B7BABF] focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center"
            type="button"
            onClick={toggleSaveAs}
          >
            <IoCloudDownloadOutline />
            Save as
          </button>
          {isOpen && (
            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-[#1f2937] absolute">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li className="flex justify-between w-full px-4 py-2">
                  <span>PDF</span>
                  <FaFilePdf
                    onClick={() => convertToPDF(canvasRef.current)}
                    className="cursor-pointer"
                  />
                </li>
                <li className="flex justify-between w-full px-4 py-2">
                  <span>SVG</span>
                  <TbFileTypeSvg
                    onClick={() => convertToSVG(canvasRef.current)}
                    className="cursor-pointer"
                  />
                </li>
                <li className="flex justify-between w-full px-4 py-2">
                  <span>JPG</span>
                  <button
                    onClick={() => convertToJPG(canvasRef.current)}
                    className="cursor-pointer"
                  >
                    JPG
                  </button>
                </li>
                <li className="flex justify-between w-full px-4 py-2">
                  <span>PNG</span>
                  <button
                    onClick={() => convertToPng(canvasRef.current)}
                    className="cursor-pointer"
                  >
                    PNG
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;

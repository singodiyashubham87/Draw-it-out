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
  const [ShowSaveAs, setShowSaveAs] = useState(false);
  var filetype = "jpg";

  const toggleIsDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <>
      <div
        id="saveAsDialogBox"
        tabindex="-1"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          ShowSaveAs ? "" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-200">
            <div className="flex flex-row justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                Save as
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-blue-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setShowSaveAs(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  takeSnapshot(canvasRef.current, "jpg");
                  setShowSaveAs(false);
                }}
              >
                JPG
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  takeSnapshot(canvasRef.current, "png");
                  setShowSaveAs(false);
                }}
              >
                PNG
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm flex justify-center items-stretch gap-[1rem] md:gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
        <button>
        <PiPencilSimpleFill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
            isDrawing ? "bg-gray-400" : ""
          }`}
          onClick={toggleIsDrawing}
          title="Draw"
        />
        </button>
        <button>
        <FaFeatherPointed
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
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
        <button>
        <RiScreenshot2Fill
          className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
          onClick={() => setShowSaveAs(true)}
          title="Snapshot"
        /></button>
      </div>
    </>
  );
};

export default Menu;

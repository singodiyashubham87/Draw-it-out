import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";

function App() {
  const [pencilWidth, setPencilWidth] = useState(false);
  const [thickness, setThickness] = useState(10);
  const [color, setColor] = useState("#000");
  const [drawable, setDrawable] = useState(false);

  useEffect(() => {
    startDrawing(color, thickness);
  });

  return (
    <>
      <div className="container w-full bg-[#B7BABF] min-w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem]">
        <div className="tools bg-[#CBCCCF] shadow-lg flex justify-center items-center gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
          <PiPencilSimpleFill
            className={`text-[3rem] p-[0.6rem] shadow-md rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
              drawable ? "bg-gray-400" : ""
            }`}
            onClick={() => setDrawable(!drawable)}
          />
          <FaFeatherPointed
            className={`text-[3rem] p-[0.6rem] shadow-md rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
              pencilWidth ? "bg-gray-400" : ""
            }`}
            onClick={() => setPencilWidth(!pencilWidth)}
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
          <input
            type="color"
            name="color"
            id="color"
            onChange={(e) =>{
              setColor(e.target.value);
              startDrawing(e.target.value, 10);
            }}
            className={`p-[0.2rem] shadow-md rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF]`}
          />
        </div>
        <canvas
          id="draw"
          className={`whiteboard bg-[#CBCCCF] rounded-[0.6rem] shadow-lg ${
            drawable ? "hover:cursor-crosshair" : "pointer-events-none	"
          }`}
        ></canvas>
        <div
          className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer"
          onClick={() => clearCanvas()}
        >
          <RxCross1 />
        </div>
      </div>
    </>
  );
}

export default App;

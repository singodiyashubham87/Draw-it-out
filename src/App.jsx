import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import startDrawing from "./utils/canvas";

function App() {
  const [drawable, setDrawable] = useState(false);

  useEffect(() => {
    startDrawing("000");
  });

  return (
    <>
      <div className="container w-full bg-[#B7BABF] min-w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem]">
        <div className="tools bg-[#CBCCCF] shadow-lg flex justify-center items-center gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
          <PiPencilSimpleFill
            className="text-[3rem] p-[0.6rem] shadow-md rounded-[0.5rem] cursor-pointer hover:bg-gray-400"
            onClick={() => setDrawable(!drawable)}
          />
          <FaFeatherPointed className="text-[3rem] p-[0.6rem] shadow-md rounded-[0.5rem] cursor-pointer hover:bg-gray-400" />
          <input
            type="color"
            name="color"
            id="color"
            onChange={(e)=>startDrawing(e.target.value)}
            className=" p-[0.2rem] shadow-md rounded-[0.5rem] cursor-pointer outline-none hover:bg-gray-400"
          />
        </div>
        <canvas
          id="draw"
          className={`whiteboard bg-[#CBCCCF] rounded-[0.6rem] shadow-lg ${
            drawable ? "hover:cursor-crosshair" : ""
          }`}
        ></canvas>
        <div className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer">
          <RxCross1 />
        </div>
      </div>
    </>
  );
}

export default App;

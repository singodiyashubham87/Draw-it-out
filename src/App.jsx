import { PiPencilSimpleFill } from "react-icons/pi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";

function App() {
  const canvasRef = useRef(null);
  const [drawable, setDrawable] = useState(true);
  const [thickness, setThickness] = useState(10);
  const [pencilWidth, setPencilWidth] = useState(false);
  const [color, setColor] = useState("#000");

  useEffect(() => {
    startDrawing(color, thickness);
  }, [color, thickness]);

  // Function to handle taking a snapshot
  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const snapshot = canvas.toDataURL();
    // Create a link element
    const link = document.createElement("a");
    link.href = snapshot;

    // Set the filename for the download
    link.download = "snapshot.png";

    // Simulate a click on the link to trigger the download
    link.click();
  };

  return (
    <>
      <div className="container w-full bg-[#B7BABF] min-w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary">
        <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm flex justify-center items-stretch gap-[1rem] md:gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
          <PiPencilSimpleFill
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
              drawable ? "bg-gray-400" : ""
            }`}
            onClick={() => setDrawable(!drawable)}
            title="Draw"
          />
          <FaFeatherPointed
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
              pencilWidth ? "bg-gray-400" : ""
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
            onClick={takeSnapshot}
            title="Snapshot"
          />
        </div>
        <canvas
          id="draw"
          className={`whiteboard bg-[#CBCCCF] rounded-[0.6rem] shadow-lg ${
            drawable ? "hover:cursor-crosshair" : "pointer-events-none	"
          }`}
          ref={canvasRef}
        ></canvas>
        <div
          className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer"
          onClick={() => {
            clearCanvas();
            startDrawing(color, thickness);
          }}
        >
          <RxCross1 />
        </div>
        <h1 className="text-[1rem]">Made with &#128157;  by <a href="https://shubham-s-socials.vercel.app/" className="decoration-none font-semibold hover:underline">Master Mickey</a>!</h1>
      </div>
    </>
  );
}

export default App;

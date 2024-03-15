import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";
import Menu from "./components/Menu";

function App() {
  const canvasRef = useRef(null);
  const [drawable, setDrawable] = useState(true);
  const [thickness, setThickness] = useState(10);
  const [color, setColor] = useState("#000");

  useEffect(() => {
    startDrawing(color, thickness);
  }, [color, thickness]);

  return (
    <>
      <div className="container w-full bg-[#B7BABF] min-w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary">
        <Menu
          drawable={drawable}
          setDrawable={setDrawable}
          thickness={thickness}
          setThickness={setThickness}
          setColor={setColor}
          canvasRef={canvasRef}
        />
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
        <h1 className="text-[1rem]">Made with &#128157; by{" "}<a href="https://shubham-s-socials.vercel.app/"
            className="decoration-none font-semibold hover:underline"
          >Master Mickey</a>!</h1>
      </div>
    </>
  );
}

export default App;

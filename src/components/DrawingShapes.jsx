import { useEffect, useState } from "react";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";
import { FaShapes } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { PiPencilSimpleFill } from "react-icons/pi";

const DrawingShapes = ({
  brushWidth,
  selectedColor,
  fillColor,
  canvasRef,
  selectedTool,
  setSelectedTool,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(0);
  const [prevMouseY, setPrevMouseY] = useState(0);

  const [snapshot, setSnapshot] = useState(null);

  const [show, setShow] = useState(false);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const drawRect = (e) => {
      const currentX = e.offsetX;
      const currentY = e.offsetY;
      const width = currentX - prevMouseX;
      const height = currentY - prevMouseY;
      ctx.putImageData(snapshot, 0, 0);
      if (!fillColor) {
        ctx.strokeRect(prevMouseX, prevMouseY, width, height);
      } else {
        ctx.fillRect(prevMouseX, prevMouseY, width, height);
      }
    };

    const drawCircle = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const radius = Math.sqrt(
        Math.pow(prevMouseX - e.offsetX, 2) +
          Math.pow(prevMouseY - e.offsetY, 2)
      );
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      fillColor ? ctx.fill() : ctx.stroke();
    };

    const drawTriangle = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
      ctx.closePath();
      fillColor ? ctx.fill() : ctx.stroke();
    };

    const startDraw = (e) => {
      setIsDrawing(true);
      setPrevMouseX(e.offsetX);
      setPrevMouseY(e.offsetY);
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      ctx.lineWidth = brushWidth;
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };

    const drawing = (e) => {
      if (!isDrawing) return;

      if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      } else if (selectedTool === "rectangle") {
        drawRect(e);
      } else if (selectedTool === "circle") {
        drawCircle(e);
      } else if (selectedTool === "triangle") {
        drawTriangle(e);
      }
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      ctx.closePath();
      setIsDrawing(false);
    };

    // Add event listeners
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", drawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [
    brushWidth,
    fillColor,
    selectedTool,
    selectedColor,
    snapshot,
    canvasRef,
    isDrawing,
  ]);

  return (
    <div className="drawing-container flex relative   p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer text-black bg-[#CBCCCF] hover:bg-[#B7BABF] "  onClick={()=>setShow((prev)=>!prev)}>
      <div className="controls cursor-pointer text-[1rem] md:text-[1.5rem] ">
         {imagePath==""?<FaShapes />:<img src={imagePath} className="h-[1rem] md:h-[1.5rem]" alt="" />} 
        <ul className="options flex space-x-4 " >
          {/* <li className="option tool" id="brush" onClick={() => setSelectedTool("brush")}>
            <PiPencilSimpleFill className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-black shadow-vsm rounded-[0.5rem] text-black cursor-pointer dark:bg-[#111111] dark:text-[#ffffff] transform transition duration-300 ease-in-out hover:bg-[#B7BABF] dark:hover:bg-gray-800 ${
            isDrawing ? "bg-gray-400" : ""
          }`} />
          </li> */}
          <div className={`flex absolute top-full bg-[#CBCCCF] shadow-black  mx-auto rounded-[0.5rem] left-1/2 transform -translate-x-1/2  shadow-md flex-col w-32 space-y-2 text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem]  text-black cursor-pointer   ${show?"block":"hidden"}`}>
            <div
              className="option tool flex gap-2 p-2 rounded-md  transform transition duration-300 ease-in-out hover:bg-[#B7BABF] dark:hover:bg-gray-800 "
              id="rectangle"
              onClick={() => { setSelectedTool("rectangle");setImagePath(rectImg) }}
            >
              <img src={rectImg} alt="Rectangle" />
              <span className=" text-sm">Rectangle</span>
            </div>
            <div
              className="option tool flex gap-2 p-2 rounded-md  transform transition duration-300 ease-in-out hover:bg-[#B7BABF] dark:hover:bg-gray-800"
              id="circle"
              onClick={() => { setSelectedTool("circle");setImagePath(circleImg) }}
            >
              <img src={circleImg} alt="Circle" />
              <span className=" text-sm">Circle</span>
            </div>
            <div
              className="option tool flex gap-2 p-2 rounded-md  transform transition duration-300 ease-in-out hover:bg-[#B7BABF] dark:hover:bg-gray-800"
              id="triangle"
              onClick={() => { setSelectedTool("triangle");setImagePath(triangleImg) }}
            >
              <img src={triangleImg} alt="Triangle" />
              <span className=" text-sm">Triangle</span>
            </div>
          </div>
        </ul>
      </div>
      <FaChevronDown
            className={`absolute top-full left-1/2 transform -translate-x-1/2 text-gray-600 ${
              show ? "rotate-180" : ""
            }`}
          />
    </div>
  );
};

export default DrawingShapes;

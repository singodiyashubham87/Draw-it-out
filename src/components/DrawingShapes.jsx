import { useEffect, useState } from "react";
import "../style/drawShapes.css";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";
import { PiPencilSimpleFill } from "react-icons/pi";

const DrawingShapes = ({ brushWidth, selectedColor, fillColor, canvasRef }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(0);
  const [prevMouseY, setPrevMouseY] = useState(0);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [snapshot, setSnapshot] = useState(null);

  const toggleIsDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawRect = (e) => {
      if (!fillColor) {
        ctx.strokeRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
      } else {
        ctx.fillRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
      }
    };

    const drawCircle = (e) => {
      ctx.beginPath();
      let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      fillColor ? ctx.fill() : ctx.stroke();
    };

    const drawTriangle = (e) => {
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
      ctx.lineWidth = brushWidth;
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };

    const drawing = (e) => {
      if (!isDrawing) return;
      ctx.putImageData(snapshot, 0, 0);

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

    const stopDrawing = () => setIsDrawing(false);

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", drawing);
      canvas.removeEventListener("mouseup", stopDrawing);
    };
  }, [brushWidth, fillColor, selectedTool, selectedColor, snapshot, canvasRef, isDrawing]);


  return (
    <div className="drawing-container flex">
      <div className="controls">
        <button>
          <PiPencilSimpleFill
            className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
              isDrawing? "bg-gray-400" : ""
            }`}
            onClick={()=>{
              setSelectedTool("brush"),
              toggleIsDrawing()
            }
          }
            title="Draw"
          />
        </button>
        {/* <label className="title">Shapes</label> */}
        <ul className="options flex space-x-4">
          <li className="option tool" id="rectangle" onClick={() => setSelectedTool("rectangle")}>
            <img src={rectImg} alt="Rectangle" />
          </li>
          <li className="option tool" id="circle" onClick={() => setSelectedTool("circle")}>
            <img src={circleImg} alt="Circle" />
          </li>
          <li className="option tool" id="triangle" onClick={() => setSelectedTool("triangle")}>
            <img src={triangleImg} alt="Triangle" />
          </li>
        </ul>
        </div>
      </div>
  );
};

export default DrawingShapes;

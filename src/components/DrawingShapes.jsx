import { useEffect, useState } from "react";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
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
  }, [brushWidth, fillColor, selectedTool, selectedColor, snapshot, canvasRef, isDrawing]);

  function toggleDropDown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function currentShapeImageElement() {
    console.log("image element req");
    let imgElement = null;
    switch (selectedTool) {
      case "rectangle":
        imgElement = <img src={rectImg} alt="Rectangle" />;
        break;
      case "circle":
        imgElement = <img src={circleImg} alt="Circle" />;
        break;
      case "triangle":
        imgElement = <img src={triangleImg} alt="Triangle" />;
        break;
      default:
        imgElement = <img src={rectImg} alt="Rectangle" />;
        break;
    }
    return imgElement;
  }

  return (
    <div className="drawing-container flex hover:bg-[#B7BABF] flex-shrink-0" onClick={toggleDropDown}>
      <div className="relative controls">
        <ul className="options flex relative w-[50px]">
          <div className="absolute md:top-[-20px] top-[-16px] flex flex-col gap-5 text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#CBCCCF] transform transition duration-300 ease-in-out hover:bg-[#B7BABF]">
            {isDropdownOpen ? (
              <>
                <li id="rectangle" onClick={() => setSelectedTool("rectangle")}>
                  <img src={rectImg} alt="Rectangle" />
                </li>
                <li id="circle" onClick={() => setSelectedTool("circle")}>
                  <img src={circleImg} alt="Circle" />
                </li>
                <li id="triangle" onClick={() => setSelectedTool("triangle")}>
                  <img src={triangleImg} alt="Triangle" />
                </li>
              </>
            ) : (
              <li id="triangle" onClick={() => setSelectedTool("triangle")}>
                {currentShapeImageElement()}
              </li>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DrawingShapes;

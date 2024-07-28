import { useEffect, useRef, useState } from "react";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";
import lineImg from "../assets/images/line.svg";
import { GiPencilBrush } from "react-icons/gi";
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

  const shapeDropRef = useRef(null);

  const handleoutsideClick = (event) => {
    if (shapeDropRef.current && !shapeDropRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleoutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleoutsideClick);
    };
  }, [isDropdownOpen]);

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

    const drawLine = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const drawRoundedBrush = (e) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const drawFlatBrush = (e) => {
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
      ctx.save();
      ctx.translate(prevMouseX, prevMouseY);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.rect(0, -brushWidth / 2, Math.sqrt(Math.pow(e.offsetX - prevMouseX, 2) + Math.pow(e.offsetY - prevMouseY, 2)), brushWidth);
      ctx.fillStyle = selectedColor;
      ctx.fill();
      ctx.restore();
    };

    const drawWatercolorBrush = (e) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.2; // Semi-transparent effect
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.globalAlpha = 1.0; // Reset alpha to default
    };

    const drawBlurBrush = (e) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.filter = "blur(4px)";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.filter = "none"; // Reset filter to default
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
      if (selectedTool === "rectangle") {
        drawRect(e);
      } else if (selectedTool === "circle") {
        drawCircle(e);
      } else if (selectedTool === "triangle") {
        drawTriangle(e);
      } else if (selectedTool === "line") {
        drawLine(e);
      } else if (selectedTool === "rounded") {
        drawRoundedBrush(e);
      } else if (selectedTool === "flat") {
        drawFlatBrush(e);
      } else if (selectedTool === "watercolor") {
        drawWatercolorBrush(e);
      } else if (selectedTool === "blur") {
        drawBlurBrush(e);
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
  }, [brushWidth, fillColor, selectedTool, selectedColor, snapshot, canvasRef, isDrawing, prevMouseX, prevMouseY]);

  function toggleDropDown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function currentShapeImageElement() {
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
      case "line":
        imgElement = <img src={lineImg} alt="Line" />;
        break;
      default:
        imgElement = <img src={rectImg} alt="Rectangle" />;
        break;
    }
    return imgElement;
  }

  const [lower, setLower] = useState(false);

  const handleBrushSelect = (brush) => {
    setSelectedTool(brush);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div>
        <button
          className=" h-10 p-2 rounded-md text-xl shadow-md hover:bg-gray-400"
          style={{ backgroundColor: '#D1D5DB', color: '#000' }}
          onClick={() => setLower(!lower)}
        >
          <GiPencilBrush />
        </button>
        {lower && (
          <div className="absolute bg-slate-300 p-1 h-40 overflow-auto">
            <div
              onClick={() => handleBrushSelect("rounded")}
              className="hover:bg-gray-400 p-2 cursor-pointer"
            >
              <h1 className="mb-2">Rounded Brush</h1>
            </div>
            <div
              onClick={() => handleBrushSelect("flat")}
              className="hover:bg-gray-400 p-2 cursor-pointer"
            >
              <h1 className="mb-2">Flat Brush</h1>
            </div>
            <div
              onClick={() => handleBrushSelect("watercolor")}
              className="hover:bg-gray-400 p-2 cursor-pointer"
            >
              <h1 className="mb-2">Watercolor Brush</h1>
            </div>
            <div
              onClick={() => handleBrushSelect("blur")}
              className="hover:bg-gray-400 p-2 cursor-pointer"
            >
              <h1 className="mb-2">Blur Brush</h1>
            </div>
          </div>
        )}
      </div>

      <div
        className="drawing-container flex-shrink-0"
        onClick={toggleDropDown}
        ref={shapeDropRef}
      >
        <div className="relative controls">
          <ul className="options flex relative w-[50px]">
            <div className="absolute md:top-[-20px] top-[-16px] flex flex-col text-[2rem] md:text-[3rem] shadow-vsm rounded-[0.5rem] text-black cursor-pointer bg-[#CBCCCF] transform transition duration-300 ease-in-out">
              {isDropdownOpen ? (
                <>
                  <li
                    className="hover:bg-[#B7BABF] p-[0.5rem] md:p-[0.8rem]"
                    id="rectangle"
                    onClick={() => {
                      setSelectedTool("rectangle");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={rectImg} alt="Rectangle" />
                  </li>
                  <li
                    className="hover:bg-[#B7BABF] p-[0.5rem] md:p-[0.8rem]"
                    id="circle"
                    onClick={() => {
                      setSelectedTool("circle");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={circleImg} alt="Circle" />
                  </li>
                  <li
                    className="hover:bg-[#B7BABF] p-[0.5rem] md:p-[0.8rem]"
                    id="triangle"
                    onClick={() => {
                      setSelectedTool("triangle");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={triangleImg} alt="Triangle" />
                  </li>
                  <li
                    className="hover:bg-[#B7BABF] px-[0.5rem] py-[0.5rem] md:py-[1rem] md:px-[0.8rem]"
                    id="line"
                    onClick={() => {
                      setSelectedTool("line");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={lineImg} alt="Line" />
                  </li>
                </>
              ) : (
                <li
                  onClick={toggleDropDown}
                  className="hover:bg-[#B7BABF] p-[0.5rem] md:p-[0.8rem]"
                >
                  {currentShapeImageElement()}
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawingShapes;

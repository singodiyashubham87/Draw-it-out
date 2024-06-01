import { useEffect, useState } from "react";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";
import diamondImg from "../assets/images/diamond.svg";
import arrowImg from "../assets/images/arrow.svg";
import heartImg from "../assets/images/heart.svg";
import parallelogramImg from "../assets/images/parallelogram.svg";
import ovalImg from "../assets/images/oval.svg";
import pentagonImg from "../assets/images/pentagon.svg";
import ringImg from "../assets/images/ring.svg";
import semicircleImg from "../assets/images/semicircle.svg";

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

    const drawDiamond = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const width = e.offsetX - prevMouseX;
      const height = e.offsetY - prevMouseY;
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(prevMouseX + width / 2, prevMouseY - height / 2);
      ctx.lineTo(prevMouseX + width, prevMouseY);
      ctx.lineTo(prevMouseX + width / 2, prevMouseY + height / 2);
      ctx.closePath();
      fillColor? ctx.fill() : ctx.stroke();
    };
    
    const drawArrow = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const headLength = 10;
      const shaftWidth = 2;
      const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineTo(e.offsetX - headLength * Math.cos(angle - Math.PI / 6), e.offsetY - headLength * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(e.offsetX, e.offsetY);
      ctx.lineTo(e.offsetX - headLength * Math.cos(angle + Math.PI / 6), e.offsetY - headLength * Math.sin(angle + Math.PI / 6));
      ctx.lineWidth = shaftWidth;
      fillColor? ctx.fill() : ctx.stroke();
    };

    const drawHeart = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
    
      const width = Math.abs(e.offsetX - prevMouseX);
      const height = Math.abs(e.offsetY - prevMouseY);
      const centerX = prevMouseX + width / 2;
      const centerY = prevMouseY + height / 2;
      const topCurveHeight = height * 0.3;
      const topCurveWidth = width / 4;
    
      ctx.moveTo(centerX, centerY + height / 2);
      ctx.arc(centerX - topCurveWidth, centerY - topCurveHeight, topCurveWidth, Math.PI, 0);
    
      ctx.arc(centerX + topCurveWidth, centerY - topCurveHeight, topCurveWidth, Math.PI, 0);
    
      ctx.arc(centerX - topCurveWidth, centerY + topCurveHeight, topCurveWidth, 0, Math.PI);
    
      ctx.arc(centerX + topCurveWidth, centerY + topCurveHeight, topCurveWidth, 0, Math.PI);
    
      ctx.closePath();
      fillColor? ctx.fill() : ctx.stroke();
    };
    
    const drawParallelogram = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const width = e.offsetX - prevMouseX;
      const height = e.offsetY - prevMouseY;
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(prevMouseX + width, prevMouseY);
      ctx.lineTo(prevMouseX + width / 2, prevMouseY + height);
      ctx.lineTo(prevMouseX - width / 2, prevMouseY + height);
      ctx.closePath();
      fillColor? ctx.fill() : ctx.stroke();
    };

    const drawOval = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const width = e.offsetX - prevMouseX;
      const height = e.offsetY - prevMouseY;
      ctx.ellipse(prevMouseX + width / 2, prevMouseY + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx.closePath();
      fillColor? ctx.fill() : ctx.stroke();
    };

    const drawPentagon = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
    
      const width = e.offsetX - prevMouseX;
      const height = e.offsetY - prevMouseY;
      const side = Math.min(Math.abs(width), Math.abs(height));
      const centerX = prevMouseX + width / 2;
      const centerY = prevMouseY + height / 2;
    
      ctx.moveTo(centerX + side * Math.cos(0), centerY + side * Math.sin(0));
    
      for (let i = 1; i <= 5; i++) {
        ctx.lineTo(
          centerX + side * Math.cos((i * 2 * Math.PI) / 5),
          centerY + side * Math.sin((i * 2 * Math.PI) / 5)
        );
      }
    
      ctx.closePath();
      fillColor ? ctx.fill() : ctx.stroke();
    };
    

    const drawRing = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
    
      const outerRadius = Math.min(Math.abs(e.offsetX - prevMouseX), Math.abs(e.offsetY - prevMouseY)) / 2;
      const innerRadius = outerRadius * 0.5; 
      const centerX = prevMouseX + (e.offsetX - prevMouseX) / 2;
      const centerY = prevMouseY + (e.offsetY - prevMouseY) / 2;
    
      ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI); 
      ctx.moveTo(centerX + outerRadius, centerY); 
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI); 
    
      ctx.closePath();
      fillColor ? ctx.fill() : ctx.stroke();
    };
    

    const drawSemicircle = (e) => {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
    
      const radius = Math.abs(e.offsetX - prevMouseX) / 2;
      const centerX = prevMouseX + (e.offsetX - prevMouseX) / 2;
      const centerY = prevMouseY + (e.offsetY - prevMouseY) / 2;
    
      if (e.offsetX > prevMouseX) {
        ctx.arc(centerX, centerY, radius, 0, Math.PI, false); // Counter-clockwise
      } else {
        ctx.arc(centerX, centerY, radius, Math.PI, 0, false); // Clockwise
      }
    
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
      } else if (selectedTool === "diamond") {
        drawDiamond(e);
      } else if (selectedTool === "arrow") {
        drawArrow(e);
      } else if (selectedTool === "heart") {
        drawHeart(e);
      } else if (selectedTool === "parallelogram") {
        drawParallelogram(e);
      } else if (selectedTool === "oval") {
        drawOval(e);
      } else if (selectedTool === "pentagon") {
        drawPentagon(e);
      } else if (selectedTool === "ring") {
        drawRing(e);
      } else if (selectedTool === "semicircle") {
        drawSemicircle(e);
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
      case "diamond":
        imgElement = <img src={diamondImg} alt="Diamond" />;
        break;
      case "arrow":
        imgElement = <img src={arrowImg} alt="Arrow" />;
        break;
      case "heart":
        imgElement = <img src={heartImg} alt="Heart" />;
        break;
      case "parallelogram":
        imgElement = <img src={parallelogramImg} alt="Parallelogram" />;
        break;
      case "oval":
        imgElement = <img src={ovalImg} alt="Oval" />;
        break;
      case "pentagon":
        imgElement = <img src={pentagonImg} alt="Pentagon" />;
        break;
      case "ring":
        imgElement = <img src={ringImg} alt="Ring" />;
        break;
      case "semicircle":
        imgElement = <img src={semicircleImg} alt="Semicircle" />;
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
                <li id="diamond" onClick={() => setSelectedTool("diamond")}>
                  <img src={diamondImg} alt="Diamond" />
                </li>
                <li id="arrow" onClick={() => setSelectedTool("arrow")}>
                  <img src={arrowImg} alt="Arrow" />
                </li>
                <li id="heart" onClick={() => setSelectedTool("heart")}>
                  <img src={heartImg} alt="Heart" />
                </li>
                <li id="parallelogram" onClick={() => setSelectedTool("parallelogram")}>
                  <img src={parallelogramImg} alt="Parallelogram" />
                </li>
                <li id="oval" onClick={() => setSelectedTool("oval")}>
                  <img src={ovalImg} alt="Oval" />
                </li>
                <li id="pentagon" onClick={() => setSelectedTool("pentagon")}>
                  <img src={pentagonImg} alt="Pentagon" />
                </li>
                <li id="ring" onClick={() => setSelectedTool("ring")}>
                  <img src={ringImg} alt="Ring" />
                </li>
                <li id="semicircle" onClick={() => setSelectedTool("semicircle")}>
                  <img src={semicircleImg} alt="Semicircle" />
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
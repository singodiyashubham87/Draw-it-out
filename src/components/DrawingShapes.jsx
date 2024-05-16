// import "../style/drawShapes.css"
// import "../utils/drawShape"
// import rectImg from "../assets/images/rectangle.svg?import"
// import circleImg from "../assets/images/circle.svg?import"
// import triangleImg from "../assets/images/triangle.svg?import"

// const DrawingShapes = () => {

//     return(
//         <div className="row">
//           <label className="title">Shapes</label>
//           <ul className="options flex space-x-4">
//             <li classNameName="option tool" id="rectangle">
//               <img src={rectImg} alt="Rectangle"/>
//               {/* <span>Rectangle</span> */}
//             </li>
//             <li className="option tool" id="circle">
//               <img src={circleImg} alt="Circle"/>
//               {/* <span>Circle</span> */}
//             </li>
//             <li className="option tool" id="triangle">
//               <img src={triangleImg} alt="Triangle"/>
//               {/* <span>Triangle</span> */}
//             </li>
//             <li className="option">
//               <input type="checkbox" id="fill-color"/>
//               <label htmlFor="fill-color">Fill color</label>
//             </li>
//           </ul>
//         </div>
//     );
// };
// export default DrawingShapes


import { useEffect, useRef, useState } from "react";
import "../style/drawShapes.css";
import rectImg from "../assets/images/rectangle.svg";
import circleImg from "../assets/images/circle.svg";
import triangleImg from "../assets/images/triangle.svg";

const DrawingShapes = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevMouseX, setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);
    const [selectedTool, setSelectedTool] = useState("brush");
    const [fillColor, setFillColor] = useState(false);
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState("#000");
    const [snapshot, setSnapshot] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const setCanvasBackground = () => {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = selectedColor;
        };

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

            if (selectedTool === "brush" || selectedTool === "eraser") {
                ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            } else if (selectedTool === "rectangle") {
                drawRect(e);
            } else if (selectedTool === "circle") {
                drawCircle(e);
            } else {
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
    }, [isDrawing, prevMouseX, prevMouseY, selectedTool, fillColor, brushWidth, selectedColor, snapshot]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return (
        <div className="drawing-container">
            <canvas ref={canvasRef} width={500} height={500}></canvas>
            <div className="controls">
                <label className="title">Shapes</label>
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
                    <li className="option">
                        <input type="checkbox" id="fill-color" onChange={(e) => setFillColor(e.target.checked)} />
                        <label htmlFor="fill-color">Fill color</label>
                    </li>
                </ul>
                <div className="option">
                    <label htmlFor="size-slider">Brush Size</label>
                    <input
                        type="range"
                        id="size-slider"
                        min="1"
                        max="50"
                        value={brushWidth}
                        onChange={(e) => setBrushWidth(e.target.value)}
                    />
                </div>
                <div className="option colors">
                    <label>Colors</label>
                    <div className="color-options">
                        <div className="option" style={{ backgroundColor: "#000" }} onClick={() => setSelectedColor("#000")}></div>
                        <div className="option" style={{ backgroundColor: "#f00" }} onClick={() => setSelectedColor("#f00")}></div>
                        <div className="option" style={{ backgroundColor: "#0f0" }} onClick={() => setSelectedColor("#0f0")}></div>
                        <div className="option" style={{ backgroundColor: "#00f" }} onClick={() => setSelectedColor("#00f")}></div>
                        <input type="color" id="color-picker" onChange={(e) => setSelectedColor(e.target.value)} />
                    </div>
                </div>
                <button className="clear-canvas" onClick={() => {
                    const ctx = canvasRef.current.getContext("2d");
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }}>Clear Canvas</button>
                <button className="save-img" onClick={() => {
                    const link = document.createElement("a");
                    link.download = `${Date.now()}.jpg`;
                    link.href = canvasRef.current.toDataURL();
                    link.click();
                }}>Save Image</button>
            </div>
        </div>
    );
};

export default DrawingShapes;

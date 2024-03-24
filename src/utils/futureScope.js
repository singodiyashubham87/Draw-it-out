// Adding eraser option and Shapes options to draw different shapes like square, circle, triangle, etc.



// /* eslint-disable react/prop-types */
// import { PiPencilSimpleFill } from "react-icons/pi";
// import { FaFeatherPointed } from "react-icons/fa6";
// import { RiScreenshot2Fill } from "react-icons/ri";
// import { RiShapesFill } from "react-icons/ri";
// import { FaSquareFull } from "react-icons/fa";
// import { FaCircle } from "react-icons/fa";
// import { RiTriangleFill } from "react-icons/ri";
// import { useState } from "react";
// import { takeSnapshot } from "../utils/canvas.js";

// const Menu = ({
//   isDrawing,
//   setIsDrawing,
//   thickness,
//   setThickness,
//   color,
//   setColor,
//   canvasRef,
// }) => {
//   const [pencilWidth, setPencilWidth] = useState(false);
//   const [hideShapes, setHideShapes] = useState(true);

//   const toggleIsDrawing = () => {
//     setIsDrawing(!isDrawing);
//   };

//   const drawRect = (x, y, width, height) => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.fillStyle = "f00";
//     console.log(x, y, width, height);
//     ctx.fillRect(x, y, width, height);
//   };

//   const handleSquare = () => {
//     let height = prompt("Enter height");
//     let width = prompt("Enter width");
//     let x = prompt("Enter x-coordinate");
//     let y = prompt("Enter y-coordinate");
//     drawRect(x, y, width, height);
//   };

//   return (
//     <>
//       <div className="max-w-[90%] flex-wrap	 tools bg-[#CBCCCF] shadow-mdm flex justify-center items-stretch gap-[1rem] md:gap-[2rem] px-[2rem] py-4 rounded-[0.6rem]">
//         <PiPencilSimpleFill
//           className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
//             isDrawing ? "bg-gray-400" : ""
//           }`}
//           onClick={toggleIsDrawing}
//           title="Draw"
//         />
//         {/* <BsFillEraserFill
//           className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
//             isErasing ? "bg-gray-400" : ""
//           }`}
//           onClick={toggleIsErasing}
//           title="Draw"
//         /> */}
//         <FaFeatherPointed
//           className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF] ${
//             pencilWidth ? "bg-gray-400" : ""
//           }`}
//           onClick={() => setPencilWidth(!pencilWidth)}
//           title="Brush Thickness"
//         />
//         {pencilWidth && (
//           <input
//             type="range"
//             name="thickness"
//             id="thickness"
//             value={thickness || 10}
//             min={1}
//             max={100}
//             onChange={(e) => setThickness(e.target.value)}
//             className="cursor-pointer"
//           />
//         )}
//         <div className="p-[1rem] px-[1.5rem] rounded-[0.5rem] relative shadow-vsm hover:bg-[#B7BABF] cursor-pointer">
//           <input
//             type="color"
//             name="color"
//             id="color"
//             title="Color Picker"
//             onChange={(e) => setColor(e.target.value)}
//             className={`bg-[#CBCCCF] p-[0.5rem] shadow-vsm rounded-[0.5rem] cursor-pointer outline-none hover:bg-[#B7BABF] flex-[0.5] w-full h-full z-[5] absolute top-0 left-0`}
//           />
//         </div>
//         <RiScreenshot2Fill
//           className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.8rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
//           onClick={() => takeSnapshot(canvasRef.current, color)}
//           title="Snapshot"
//         />
//         <div className="relative">
//           <RiShapesFill
//             className={`text-[2rem] md:text-[3rem] p-[0.5rem] md:p-[0.6rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]`}
//             title="Shapes"
//             onClick={() => setHideShapes(!hideShapes)}
//           />
//           <div
//             className={`absolute bottom-[-100%] left-[100%] rounded-[0.5rem]  bg-[#CBCCCF] gap-4 py-2 px-4 shadow-mdm ${
//               hideShapes ? "hidden" : "flex"
//             }`}
//             onClick={handleSquare}
//           >
//             <FaSquareFull className=" text-[1.5rem] md:text-[2rem] p-[0.2rem] md:p-[0.4rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]" />
//             <FaCircle className=" text-[1.5rem] md:text-[2rem] p-[0.2rem] md:p-[0.4rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]" />
//             <RiTriangleFill className=" text-[1.5rem] md:text-[2rem] p-[0.2rem] md:p-[0.4rem] shadow-vsm rounded-[0.5rem] cursor-pointer hover:bg-[#B7BABF]" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Menu;









//Redraw canvas function to be used...

// function redrawCanvas(ctx) {
//   ctx.fillStyle = "#000";
//   drawHistory.forEach((point, i) => {
//     if (i === 0) {
//       ctx.beginPath();
//       ctx.moveTo(point.x, point.y);
//     } else {
//       ctx.lineTo(point.x, point.y);
//       ctx.stroke();
//     }
//   });
// }

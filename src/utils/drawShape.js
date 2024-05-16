// const canvas = document.querySelector("canvas"),
// toolBtns = document.querySelectorAll(".tool"),
// fillColor = document.querySelector("#fill-color")
// ctx = canvas.getContext("2d");

// const drawRect = (e) => {
//     // if fillColor isn't checked draw a rect with border else draw rect with background
//     if(!fillColor.checked) {
//         // creating circle according to the mouse pointer
//         return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
//     }
//     ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
// }

// const drawCircle = (e) => {
//     ctx.beginPath(); // creating new path to draw circle
//     // getting radius for circle according to the mouse pointer
//     let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
//     ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
//     fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
// }

// const drawTriangle = (e) => {
//     ctx.beginPath(); // creating new path to draw circle
//     ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
//     ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
//     ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
//     ctx.closePath(); // closing path of a triangle so the third line draw automatically
//     fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
// }

// const startDraw = (e) => {
//     isDrawing = true;
//     prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
//     prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
//     ctx.beginPath(); // creating new path to draw
//     ctx.lineWidth = brushWidth; // passing brushSize as line width
//     ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
//     ctx.fillStyle = selectedColor; // passing selectedColor as fill style
//     // copying canvas data & passing as snapshot value.. this avoids dragging the image
//     snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
// }

// const drawing = (e) => {
//     if(!isDrawing) return; // if isDrawing is false return from here
//     ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

//     if(selectedTool === "brush" || selectedTool === "eraser") {
//         // if selected tool is eraser then set strokeStyle to white 
//         // to paint white color on to the existing canvas content else set the stroke color to selected color
//         ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
//         ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
//         ctx.stroke(); // drawing/filling line with color
//     } else if(selectedTool === "rectangle"){
//         drawRect(e);
//     } else if(selectedTool === "circle"){
//         drawCircle(e);
//     } else {
//         drawTriangle(e);
//     }
// }

// toolBtns.forEach(btn => {
//     btn.addEventListener("click", () => { // adding click event to all tool option
//         // removing active class from the previous option and adding on current clicked option
//         document.querySelector(".options .active").classList.remove("active");
//         btn.classList.add("active");
//         selectedTool = btn.id;
//     });
// });

// canvas.addEventListener("mousedown", startDraw);
// canvas.addEventListener("mousemove", drawing);
// canvas.addEventListener("mouseup", () => isDrawing = false);

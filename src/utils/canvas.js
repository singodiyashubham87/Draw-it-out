// Array to store the drawing history
import jsPdf from "jspdf";
import { Context } from "svgcanvas";
let drawHistory = [];

export function startDrawing(canvas, color, lineThickness, bgColor) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.setAttribute("willReadFrequently", "true");
  ctx.strokeStyle = `${color}`;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineThickness;

  let isDrawing = false;

  // Main draw function
  const draw = (e) => {
    if (!isDrawing) return;
    if (lastX === 0 && lastY === 0) {
      lastX = e.offsetX;
      lastY = e.offsetY;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
    drawHistory.push({ x: e.offsetX, y: e.offsetY });
  };

  let lastX = 0;
  let lastY = 0;
  canvas.addEventListener("mousedown", (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    isDrawing = true;
    drawHistory.push({ x: lastX, y: lastY });
  });
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));
  canvas.addEventListener("mousemove", draw);

  //Event listeners for touch devices
  canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0]; // Get the first touch
    lastX = touch.clientX - canvas.offsetLeft;
    lastY = touch.clientY - canvas.offsetTop;
    isDrawing = true;
  });

  canvas.addEventListener("touchend", () => {
    isDrawing = false;
  });

  canvas.addEventListener("touchcancel", () => {
    isDrawing = false;
  });

  canvas.addEventListener("touchmove", (e) => {
    // added e.preventDefault();
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0]; // Get the first touch
    const offsetX = touch.clientX - canvas.offsetLeft;
    const offsetY = touch.clientY - canvas.offsetTop;
    draw({ offsetX, offsetY });
  });
}

// Function to clear the canvas
export function clearCanvas(canvas, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to handle taking a snapshot
export const takeSnapshot = (canvas) => {
  const snapshot = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = snapshot;
  link.download = "snapshot.png";
  link.click();
};

// Function to handle converting it into PDF format
export const convertToPDF = (canvas) => {
  const imgData = canvas.toDataURL();
  const pdf = new jsPdf();
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  console.log("Width & Height: ", width, height);
  pdf.addImage(imgData, "JPEG", 0, 0, width, height);
  pdf.save("download.pdf");
};

// Function to handle converting it into SVG format
export const convertToSVG = (canvas) => {
  const context2D = canvas.getContext("2d");
  const options = {
    width: canvas.width,
    height: canvas.height,
    ctx: context2D,
  };
  const ctx = new Context(options);
  const svgContent = ctx.getSerializedSvg();
  const blob = new Blob([svgContent], { type: "image/svg+xml" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "image.svg";

  link.click();
};

export function changeBG(canvas, color) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawHistory = [];
}

export function increaseHeight(canvas, bgColor) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];
  let newHeight = canvas.height + canvas.height * 0.1;
  if (newHeight > window.innerHeight) {
    newHeight = window.innerHeight;
  }

  // Save the current drawing and clear canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  clearCanvas(canvas, bgColor);

  // Resize the canvas
  canvas.height = newHeight;

  // Redraw the portion of the drawing that fits in the new canvas size
  ctx.putImageData(imageData, 0, 0);

  //retaining the bg
  canvas.style.backgroundColor = bgColor;

  drawHistory = histArray.filter((point) => point.y <= newHeight);
}

export function decreaseHeight(canvas, bgColor) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];
  let newHeight = canvas.height - canvas.height * 0.1;
  if (newHeight < 1) {
    // Ensure height doesn't go below 1
    newHeight = 1;
  }

  // Save the current drawing and clear canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // clearCanvas(canvas, bgColor);

  // Resize the canvas
  canvas.height = newHeight;

  // Redraw the portion of the drawing that fits in the new canvas sizes
  ctx.putImageData(imageData, 0, 0);

  //retaining the bg
  ctx.fillStyle = bgColor;

  drawHistory = histArray.filter((point) => point.y <= newHeight);
}

export function handleUpdates(canvas, color, lineThickness, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = lineThickness;
  ctx.strokeStyle = `${color}`;
  canvas.style.backgroundColor = bgColor;
  ctx.fillStyle = bgColor;
  console.log("update called");
}

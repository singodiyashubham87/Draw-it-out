// Array to store the drawing history
import jsPdf from "jspdf";
import { Context } from "svgcanvas";
let drawHistory = [];
export function startDrawing(
  canvas,
  color,
  lineThickness,
  bgColor,
  brushStyle
) {
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

    // Initialize lastX and lastY if not already initialized
    if (lastX === 0 && lastY === 0) {
      lastX = e.offsetX;
      lastY = e.offsetY;
    }

    // Begin a new path for the current stroke
    ctx.beginPath();

    // Move to the last drawn point
    ctx.moveTo(lastX, lastY);

    // Draw a line to the current mouse position
    ctx.lineTo(e.offsetX, e.offsetY);

    // Stroke the path to display it on the canvas
    ctx.stroke();

    // Update lastX and lastY for the next drawing action
    lastX = e.offsetX;
    lastY = e.offsetY;

    // Add the current position to the drawing history
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
  canvas.addEventListener("mouseout", () => {
    lastX = 0;
    lastY = 0;
  });
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

  canvas.addEventListener("mouseleave", () => (isDrawing = false));
  canvas.addEventListener("touchmove", (e) => {
    // added e.preventDefault();
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0]; // Get the first touch
    const offsetX = touch.clientX - canvas.offsetLeft;
    const offsetY = touch.clientY - canvas.offsetTop;
    draw({ offsetX, offsetY });
  });
  setBrushStyle(ctx, brushStyle);
}

// Function to clear the canvas
export function clearCanvas(canvas, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Snapshot by default saves files as png
// here we broke its functionality to convertToPng for readability
// and consistency with other export option functions
export const convertToPng = (canvas) => {
  let snapshot = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = snapshot;
  link.download = `snapshot.png`;
  link.click();
};

export const convertToJPG = (canvas) => {
  let snapshot = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = snapshot;
  link.download = `snapshot.jpg`;
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

//Updating the brush style
function setBrushStyle(ctx, brushStyle) {
  switch (brushStyle) {
    case "solid":
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;
      break;
    case "dotted":
      ctx.setLineDash([2, 20]);
      ctx.globalAlpha = 1.0;
      break;
    case "dashed":
      {
        const dotSpacing = 20;
        ctx.setLineDash([dotSpacing / 2, dotSpacing]);
        ctx.globalAlpha = 1.0;
        break;
      }
    case "faded":
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.01;
      break;
    default:
      break;
  }
}

// Assuming drawHistory is declared somewhere in the global scope

export function increaseHeight(canvas, bgColor, thickness, color, brushStyle) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];

  // Ensure the new height increases by at least 50 pixels
  let newHeight = canvas.height + Math.max(50, canvas.height * 0.1);
  if (newHeight > window.innerHeight) {
    newHeight = window.innerHeight;
  }

  // Save the current drawing and clear the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  clearCanvas(canvas, bgColor);

  // Resize the canvas
  canvas.height = newHeight;

  // Redraw the portion of the drawing that fits in the new canvas size
  ctx.putImageData(imageData, 0, 0);

  // Update drawHistory to fit within new height
  drawHistory = histArray.filter((point) => point.y <= newHeight);
  handleUpdates(canvas, color, thickness, bgColor, brushStyle);
}

export function decreaseHeight(canvas, bgColor, thickness, color, brushStyle) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];
  const MIN_HEIGHT=250;
  // Calculate new height, reducing by 10% of the current height
  let newHeight = canvas.height - canvas.height * 0.1;
  
  // Ensure new height does not go below 1 pixel
  if (newHeight < MIN_HEIGHT) {
    newHeight = MIN_HEIGHT;
  }

  // Save the current drawing and clear the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  clearCanvas(canvas, bgColor);

  // Resize the canvas
  canvas.height = newHeight;

  // Redraw the portion of the drawing that fits in the new canvas size
  ctx.putImageData(imageData, 0, 0);

  // Update drawHistory to fit within new height
  drawHistory = histArray.filter((point) => point.y <= newHeight);
  handleUpdates(canvas, color, thickness, bgColor, brushStyle);
}


export function handleUpdates(
  canvas,
  color,
  lineThickness,
  bgColor,
  brushStyle
) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = lineThickness;
  ctx.strokeStyle = `${color}`;
  canvas.style.backgroundColor = bgColor;
  ctx.fillStyle = bgColor;
  setBrushStyle(ctx, brushStyle);
  console.log("update called");
}

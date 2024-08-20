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
  canvas.width = window.innerWidth * 0.9; //default (onload)
  canvas.height = window.innerHeight * 0.65;

  canvas.width = window.innerWidth * 0.9;
}

export function handleDrawing(
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

  // Variables to store the mouse position and state
  let isDrawing = false;
  let mouseX = 0;
  let mouseY = 0;

  // Function to update the mouse position
  function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    drawHistory.push({ x: mouseX, y: mouseY }); // Add the current position to the drawing history
  }

  function updateTouchPosition(touch) {
    const rect = canvas.getBoundingClientRect();
    mouseX = touch.clientX - rect.left;
    mouseY = touch.clientY - rect.top;
    drawHistory.push({ x: mouseX, y: mouseY }); // Add the current position to the drawing history
  }

  // Function to start drawing
  function startDrawing(event) {
    isDrawing = true;
    if (event.touches) {
      updateTouchPosition(event.touches[0]);
    } else {
      updateMousePosition(event);
    }
  }

  // Function to stop drawing
  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset the path so a new line doesn't connect to the previous one
  }

  // Function to draw on the canvas
  function draw(event) {
    if (!isDrawing) return;
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(mouseX, mouseY); // Move the path to the current mouse position
    if (event.touches) {
      updateTouchPosition(event.touches[0]);
    } else {
      updateMousePosition(event);
    }
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }

  // Add event listeners for mouse interactions
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseleave", stopDrawing); // Stop drawing if the mouse leaves the canvas

  // Add touch event listeners for mobile devices
  canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    startDrawing(event);
  });

  canvas.addEventListener("touchend", (event) => {
    event.preventDefault();
    stopDrawing();
  });
  canvas.addEventListener("touchcancel", (event) => {
    event.preventDefault();
    stopDrawing();
  });
  canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    draw(event);
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
  // Ensure canvas is not null
  if (!canvas) {
    console.error("Canvas is not defined.");
    return;
  }

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Create SVG namespace
  const svgNS = "http://www.w3.org/2000/svg";

  // Create SVG element
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", canvasWidth);
  svg.setAttribute("height", canvasHeight);
  svg.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
  svg.setAttribute("xmlns", svgNS);

  // Create an image element and set its attributes
  const image = document.createElementNS(svgNS, "image");
  image.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    canvas.toDataURL("image/png")
  );
  image.setAttribute("width", canvasWidth);
  image.setAttribute("height", canvasHeight);

  // Center the image within the SVG viewBox
  const svgWidth = parseInt(svg.getAttribute("width"), 10);
  const svgHeight = parseInt(svg.getAttribute("height"), 10);

  // Calculate offsets
  const xOffset = (svgWidth - canvasWidth) / 2;
  const yOffset = (svgHeight - canvasHeight) / 2;

  // Apply offsets to center the image
  image.setAttribute("x", xOffset);
  image.setAttribute("y", yOffset);

  svg.appendChild(image);

  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  // Create a blob from the SVG string and trigger download
  const blob = new Blob([svgString], { type: "image/svg+xml" });
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
    case "dashed": {
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
}

export function decreaseHeight(canvas, bgColor, thickness, color, brushStyle) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];
  const MIN_HEIGHT = 250;
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
  handleUpdates(canvas, color, thickness, bgColor, brushStyle);
  // Redraw the portion of the drawing that fits in the new canvas size
  ctx.putImageData(imageData, 0, 0);

  // Update drawHistory to fit within new height
  drawHistory = histArray.filter((point) => point.y <= newHeight);
}

export function changeAspect(
  canvas,
  bgColor,
  thickness,
  color,
  brushStyle,
  hnum,
  wnum
) {
  const ctx = canvas.getContext("2d");
  const histArray = [...drawHistory];
  let newHeight, newWidth;

  // Set new height
  if (hnum == 100 && wnum == 100) {
    //default case
    newWidth = window.innerWidth * 0.8;
    newHeight = window.innerHeight * 0.6;
  } else {
    //adjust wnum hnums of various options to adjust the size
    newWidth = (window.innerWidth * wnum) / 100;
    newHeight = (window.innerWidth * hnum) / 100;
  }

  // Save the current drawing and clear the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  clearCanvas(canvas, bgColor);

  // Resize the canvas
  canvas.height = newHeight;
  canvas.width = newWidth;

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
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  setBrushStyle(ctx, brushStyle);
  console.log("update called");
}

// Array to store the drawing history
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
    if (!isDrawing) return;
    const touch = e.touches[0]; // Get the first touch
    const offsetX = touch.clientX - canvas.offsetLeft;
    const offsetY = touch.clientY - canvas.offsetTop;
    draw({ offsetX, offsetY });
  });

  switch (brushStyle) {
    case "solid":
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;
      break;
    case "dotted":
      ctx.setLineDash([2, 20]);
      ctx.globalAlpha = 2.0;
      break;
    case "dashed":
      const dotSpacing = 20; // Adjust the spacing between dots as needed
      ctx.setLineDash([dotSpacing / 2, dotSpacing]); // Fixed dot spacing
      ctx.globalAlpha = 1.0;
      break;
    case "faded":
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.01;
      
      break;
    default:
      break;
  }
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

export function changeBG(canvas, color) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawHistory = [];
}

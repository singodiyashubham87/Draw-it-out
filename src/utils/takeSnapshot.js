// Function to handle taking a snapshot
export const takeSnapshot = (canvasRef) => {
  const canvas = canvasRef.current;
  const snapshot = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = snapshot;
  link.download = "snapshot.png";
  link.click();
};

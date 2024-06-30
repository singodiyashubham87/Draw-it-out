/* eslint-disable react/prop-types */
import { changeBG } from "../utils/canvas";
import { rainbowColors } from "../utils/helpers";

const BgColorSidePanel = ({ canvasRef, setBgColor }) => {
  return (
    
    // The margin with the color pallet and cross is changes to prevent accidental clicks via  vsm:mb-40
    <div className="color-pallet gsm:w-[60%] h-[20px] p-7 grid grid-cols-1 vsm:grid-cols-4 vsm:gap-4 vsm: mb-[100px] vvsm:grid-cols-4 gsm:grid-cols-7 gap-2 vsm:mb-40 gsm:gap-2 gsm:pb-[5rem] gsm:pt-[4rem] gsm:mb-8 mx-auto">

      <input
        type="color"
        name="color"
        id="color"
        title="Color Picker"
        // defaultValue={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className={`cursor-pointer m-auto w-[2rem] h-[2rem] vsm:w-[3rem] vsm:h-[3rem]  rounded-[0.4rem] border-[0.2px] border-black bg-gradient-to-r from-red-700 via-yellow-600 to-green-600 `}
      />
      {rainbowColors?.map((val, i) => (
        <BgColor
          key={i}
          color={val}
          setBgColor={setBgColor}
          canvas={canvasRef.current}
        />
      ))}
    </div>
  );
};

const BgColor = ({ color, setBgColor, canvas }) => {
  return (
    <>
      <div
        style={{ backgroundColor: color }}
        className={`cursor-pointer m-auto w-[2rem] h-[2rem] vsm:w-[3rem] vsm:h-[3rem] rounded-[0.4rem] border-[0.2px] border-black shadow-lg shadow-black  dark:border-2 dark:border-black hover:scale-110 hover:border-2`}
        onClick={() => {
          setBgColor(color);
          changeBG(canvas, color);
        }}
      ></div>
    </>
  );
};

export default BgColorSidePanel;

/* eslint-disable react/prop-types */
import { changeBG } from "../utils/canvas";

const BgColor = ({ color, setBgColor, canvas }) => {
  return (
    <>
      <div
        style={{ backgroundColor: color }}
        className={`cursor-pointer m-auto w-[2rem] h-[2rem] vsm:w-[3rem] vsm:h-[3rem] rounded-[0.4rem] border-[0.2px] border-black`}
        onClick={() => {
          setBgColor(color);
          changeBG(canvas, color);
        }}
      ></div>
    </>
  );
};

export default BgColor;

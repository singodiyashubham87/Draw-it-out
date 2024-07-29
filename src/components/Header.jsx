import React, { useState } from 'react'
import logoText from "../assets/images/logoText.png";
import { FaBookOpen } from "react-icons/fa";

const Header = () => {
    const [modal, setModal] = useState(false);

    const style = {
        guideline: `p-4 flex text-xs`,
    };

    const showGuidelines = () => {
        setModal(!modal);
    };

  return (
    <div>
        <div className="relative">
                <img
                    src={logoText}
                    alt=""
                    className="absolute top-4 left-6 p-3 bg-gray-800"
                    style={{ width: "100px", height: "100px" }}
                />
                <div className="flex flex-col justify-center text-center items-center bg-gray-800 dark:bg-black pb-8 pt-8">
                    <h1 className="font-['Love_Ya_Like_A_Sister',cursive] text-4xl text-slate-200 p-2">
                        Draw it Out!
                    </h1>
                    <p className="text-gray-500 text-xs">
                        All you need is a canvas to craft your ideas.
                    </p>
                </div>

                <button
                    id="guideLines"
                    className="absolute top-7 right-6 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300"
                >
                    <FaBookOpen
                        size={28}
                        color="white"
                        className="bg-black p-1 rounded-xl"
                        aria-label="show-guidelines"
                        onClick={showGuidelines}
                    />
                </button>
            </div>
    </div>
  )
}

export default Header

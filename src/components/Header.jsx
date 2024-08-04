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
                    className="absolute top-4 md:left-6 left-2 p-3 bg-gray-800 w-24 h-24 "
                />
                <div className="flex flex-col justify-center items-start   md:items-center bg-gray-800 dark:bg-black pl-28 md:pl-0 pb-8 pt-8">
                    <h1 className="font-['Love_Ya_Like_A_Sister',cursive] md:text-4xl text-3xl text-slate-200 md:px-2 py-2">
                        Draw it Out!
                    </h1>
                    <p className="text-gray-500 text-xs">
                        All you need is a canvas to craft your ideas.
                    </p>
                </div>

                <button
                    id="guideLines"
                    className="absolute top-7 md:right-6 right-1 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300"
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

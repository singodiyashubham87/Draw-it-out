import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegEye, FaRegEyeSlash, FaSun } from "react-icons/fa";

// import download icon
import { FaDownload } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { tourSteps } from "../utils/helpers.js";
import BgColorSidePanel from "../components/BgColorSidePanel.jsx";
import Menu from "../components/Menu";
import { handleUpdates, handleDrawing } from "../utils/canvas";
import { getCookie, setCookie, eraseCookie } from "../utils/manageCookies.js";
import { VscClose } from "react-icons/vsc";
import { PiPencilSimpleFill } from "react-icons/pi";
import { BiArea } from "react-icons/bi";
import { FaFeatherPointed } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import { TbFileTypeSvg } from "react-icons/tb";
import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import Joyride from "react-joyride";
import { SiBuymeacoffee } from "react-icons/si";
import useGoogleDrive from '../useGoogleDrive'; // Import the custom hook 

function Home() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(true);
    const [thickness, setThickness] = useState(4);
    const [color, setColor] = useState("#000");
    const [bgColor, setBgColor] = useState("#b7babf");
    const [darkMode, setDarkMode] = useState(null);
    const [showMenuAndBgColor, setShowMenuAndBgColor] = useState(true);
    const [steps] = useState(tourSteps);
    const [modal, setModal] = useState(false);
    const [canvasInitialized, setCanvasInitialized] = useState(false);
    const [brushStyle, setBrushStyle] = useState("solid");
    const [selectedTool, setSelectedTool] = useState("brush");
    const { signIn, uploadFile } = useGoogleDrive(); // Use the custom hook
    const [showTour, setShowTour] = useState(false);

    const style = {
        guideline: `p-4 flex text-xs`,
    };

    const showGuidelines = () => {
        setModal(!modal);
    };

    const closeModal = () => {
        setModal(false);
    };

    const BUY_ME_COFFEE_LINK = "https://buymeacoffee.com/mastermickey";

    useEffect(() => {
        const canvas = canvasRef.current;

        const updateCanvasSize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth * 0.9;
            canvas.height = parent.clientHeight;
        };

        if (canvas && !canvasInitialized) {
            setCanvasInitialized(true);
            updateCanvasSize();
            window.addEventListener("resize", updateCanvasSize);
            handleDrawing(canvas, color, thickness, bgColor, brushStyle);
        } else if (canvasInitialized) {
            handleUpdates(canvas, color, thickness, bgColor, brushStyle);
        }

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, [bgColor, color, thickness, canvasInitialized, brushStyle]);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            const isDarkMode = savedDarkMode === 'true';
            setDarkMode(isDarkMode);
            if (isDarkMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }

        const tourSeen = getCookie('tourSeen');
        if (!tourSeen) {
            setShowTour(true);
            setCookie('tourSeen', 'true', 365);
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
        document.body.classList.toggle("dark");
    };

    // to save drawing in google drive
    const saveDrawing = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.toBlob((blob) => {
                const file = new File([blob], 'drawing.png', { type: 'image/png' });
                signIn().then(() => uploadFile(file)); // Sign in and upload file to Google Drive
            });
        } else {
            alert('Canvas not found!');
        }
    };
        return (<>
          
            <div className="bg-[#d3d4d9] dark:bg-black pb-3"></div>
            <div className="bg-[#CBCCCF] flex flex-col min-w-full justify-evenly gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white transform transition duration-500 ease-in-out">
                {showTour && (
                    <Joyride
                        steps={steps}
                        continuous
                        showSkipButton={true}
                        locale={{
                            back: "Back",
                            close: "Close",
                            last: "Start",
                            next: "Next",
                            skip: "Skip",
                        }}
                    />
                )}
            </div>
            {/* Buy me a coffee element */}
            <div className="bg-[#d3d5d8] flex flex-col min-w-full justify-center gsm:flex-row dark:bg-zinc-800 dark:bg-blend-luminosity dark:text-white">
                <div className="flex flex-col min-w-full justify-center gsm:flex-column">
                    <div className="relative flex flex-col justify-between mt-[0.5vh] items-center font-primary">
                        {/* Drawing Toolbar */}
                        <div className="flex flex-col md:flex-row justify-between md:justify-start lg:justify-center items-center lg:gap-10 md:gap-4 gap-10 w-full">
                            {showMenuAndBgColor && (
                                <Menu
                                    isDrawing={isDrawing}
                                    setIsDrawing={setIsDrawing}
                                    thickness={thickness}
                                    setThickness={setThickness}
                                    color={color}
                                    setColor={setColor}
                                    canvasRef={canvasRef}
                                    setBrushStyle={setBrushStyle}
                                    brushStyle={brushStyle}
                                    bgColor={bgColor}
                                    selectedTool={selectedTool}
                                    setSelectedTool={setSelectedTool}
                                />
                            )}
                            {/* Toolbar right menu section */}
                            <div className="flex flex-row justify-center align-center items-center md:absolute top-2 md:right-2 right-2">
                                {/* Eye button */}
                                <div
                                    className={`bg-[#CBCCCF] scale-[0.7] p-[1rem] text-[1.5rem] w-80% rounded-[50%] shadow-black shadow-md transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-[0.8] ${!showMenuAndBgColor && "mt-10"
                                        }`}
                                    onClick={() => {
                                        setShowMenuAndBgColor((state) => !state);
                                    }}
                                >
                                    {showMenuAndBgColor ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>

                                {/* Theme Changer */}
                                <div
                                    className={`p-[1rem] text-[1.5rem] scale-[0.7] rounded-[50%] shadow-md hover:bg-gray-1000 transform transition duration-300 ease-in-out hover:md:scale-[0.8] cursor-pointer bg-black dark:bg-amber-400 shadow-black dark:shadow-black dark:shadow-md ${!showMenuAndBgColor && "mt-10"
                                        }`}
                                    onClick={toggleDarkMode}
                                >
                                    {darkMode ? (
                                        <FaSun className="text-black" />
                                    ) : (
                                        <FaMoon className="text-white" />
                                    )}
                                </div>

                                {/* Save Drawing Button */}
                                <div className="flex justify-center items-center">
                                    <button
                                        className={`bg-[#CBCCCF] scale-[0.7] p-[1rem] text-[1.5rem] w-80% rounded-[50%] shadow-black shadow-md transform transition duration-300 ease-in-out text-black hover:bg-gray-400 cursor-pointer dark:bg-slate-800 dark:text-[#ffffff] hover:md:scale-[0.8] ${!showMenuAndBgColor && "mt-10"
                                            }`}
                                        onClick={saveDrawing}
                                        aria-label="Upload Drawing to Google Drive"
                                        title="Upload"
                                    >
                                        <FaDownload size={24} />
                                    </button>
                                </div>

                                {/* Buy me a coffee */}
                                <a
                                    href={BUY_ME_COFFEE_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex justify-end sm:ml-0 ${!showMenuAndBgColor && "mt-10"
                                        }`}
                                >
                                    <button className="flex mt-2 mb-2 items-center ml-1 mr-1 bg-transparent border border-black text-black focus:outline-none bg-[#d4d5d7] hover:bg-[#c6c9ce] rounded-xl p-2 dark:text-white">
                                        <SiBuymeacoffee className="text-xl" />
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* ----- Canvas ------ */}

                        <div className="flex justify-center items-center w-full h-full flex-grow">
                            <canvas
                                id="draw"
                                className={`whiteboard bg-slate-950 max-w-full mt-[4vh] rounded-[0.6rem] shadow-md shadow-black dark:shadow-black dark:shadow-lg ${isDrawing
                                    ? "cursor-pointer"
                                    : "cursor-default pointer-events-none"
                                    }`}
                                ref={canvasRef}
                            ></canvas>
                        </div>
                        {showMenuAndBgColor && (
                            <BgColorSidePanel canvasRef={canvasRef} setBgColor={setBgColor} />
                        )}

                        <div
                            className="bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-black shadow-vsm dark:shadow-black dark:shadow-lg hover:bg-gray-400 cursor-pointer transform transition duration-300 ease-in-out mt-10 dark:text-[#111111]  hover:md:scale-110"
                            id="reset"
                            onClick={() => {
                                setBgColor("#B7BABF");
                                setBrushStyle("solid");
                                setSelectedTool("brush");
                                setCanvasInitialized(false);
                                setIsDrawing(true);
                            }}
                        >
                            <RxCross1 />
                        </div>
                        <h1 className="text-[0.7rem] vvsm:text-[1rem] pb-4 pt-2 dark:text-white">
                            Made with &#128157; by{" "}
                            <a
                                href="https://shubham-s-socials.vercel.app/"
                                className="decoration-none font-semibold hover:underline"
                            >
                                Master Mickey
                            </a>
                            !
                        </h1>
                    </div>
                    <div
                        className={
                            modal
                                ? "z-20 fixed right-3 top-5 w-[300px] h-[500px] bg-gray-100"
                                : "fixed right-[-100%]"
                        }
                        onClick={showGuidelines}
                    >
                        <VscClose
                            size={20}
                            color="white"
                            onClick={closeModal}
                            className="bg-black rounded-xl p-1 absolute top-4 right-4 cursor-pointer"
                        />
                        <ul className="pt-18 p-4 dark:bg-zinc-800">
                            <li className="p-2 font-bold text-lg uppercase">Guidelines</li>
                            <li className={style.guideline}>
                                <PiPencilSimpleFill />
                                <span className="ml-2">Draw your heart out using the pen.</span>
                            </li>
                            <li className={style.guideline}>
                                <FaFeatherPointed />
                                <span className="ml-2">
                                    {" "}
                                    Use a light touch for delicate lines.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <RiScreenshot2Fill />
                                <span className="ml-2">
                                    {" "}
                                    Capture your screen for reference.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <FaFilePdf />{" "}
                                <span className="ml-2">
                                    Export your work as a PDF for easy sharing.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <TbFileTypeSvg />
                                <span className="ml-2">
                                    {" "}
                                    Save your artwork as an SVG for scalability.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <PiPlus />
                                <span className="ml-2"> Zoom in to work on finer details.</span>
                            </li>
                            <li className={style.guideline}>
                                <PiMinus />
                                <span className="ml-2">
                                    {" "}
                                    Zoom out for an overview of your drawing.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <BiArea />
                                <span className="ml-2">
                                    Change your canvas size to preset values.
                                </span>
                            </li>
                            <li className={style.guideline}>
                                <FaRegEye />
                                <span className="ml-2">View only your canvas.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>  </>

        )
    }

    export default Home;

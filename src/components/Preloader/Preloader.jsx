import React ,{useState,useEffect} from 'react';
import preloaderAnimation from '../../utils/preloaderAnimation.json';
import Lottie from 'lottie-react';
import App from '../../App';
import Chatbot from '../Chatbot/Chatbot';
function Preloader() {
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        },2000)
    },[])
return (
    
     
            loading ?
            <div className='flex justify-center items-center relative top-[12rem]'>
                <Lottie className="w-[40vw] h-[40vh]" animationData={preloaderAnimation}/>
            </div>
             :
            //Rest Code
                <App/>
        
  );
}
export default Preloader;
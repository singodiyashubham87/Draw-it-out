import React ,{useState,useEffect} from 'react';
import pre from '../../../assets/images/pre.json';
import Lottie from 'lottie-react';
import App from '../../../App';
import Chatbot from '../Chatbot';
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
                <Lottie className="w-[40vw] h-[40vh]" animationData={pre}/>
            </div>
             :
            //Rest Code
                <App/>
        
  );
}
export default Preloader;
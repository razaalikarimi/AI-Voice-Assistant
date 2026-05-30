import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "../assets/ai.gif"
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { IoMicOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import userImg from "../assets/user.gif"

function Home() {
  const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
  const navigate=useNavigate()
  const [listening,setListening]=useState(false)
  const [userText,setUserText]=useState("")
  const [aiText,setAiText]=useState("")
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const [ham,setHam]=useState(false)
  const isRecognizingRef=useRef(false)
  const synth=window.speechSynthesis

  const handleLogOut=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  const startRecognition = () => {
   if (!isSpeakingRef.current && !isRecognizingRef.current) {
    try {
      recognitionRef.current?.start();
      console.log("Recognition requested to start");
    } catch (error) {
      if (error.name !== "InvalidStateError") {
        console.error("Start error:", error);
      }
    }
  }
  }

  const speak=(text)=>{
    const utterence=new SpeechSynthesisUtterance(text)
    utterence.lang = 'hi-IN';
    const voices =window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current=true
    utterence.onend=()=>{
        setAiText("");
  isSpeakingRef.current = false;
  setTimeout(() => {
    startRecognition(); 
  }, 800);
    }
   synth.cancel(); 
   synth.speak(utterence);
  }

  const handleCommand=(data)=>{
    const {type,userInput,response}=data
      speak(response);
    
    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
     if (type === 'calculator-open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }
     if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, '_blank');
    }
    if (type ==="facebook-open") {
      window.open(`https://www.facebook.com/`, '_blank');
    }
     if (type ==="weather-show") {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }
    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  }

useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognitionRef.current = recognition;

  let isMounted = true;  

  const startTimeout = setTimeout(() => {
    if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognition.start();
        console.log("Recognition requested to start");
      } catch (e) {
        if (e.name !== "InvalidStateError") {
          console.error(e);
        }
      }
    }
  }, 1000);

  recognition.onstart = () => {
    isRecognizingRef.current = true;
    setListening(true);
  };

  recognition.onend = () => {
    isRecognizingRef.current = false;
    setListening(false);
    if (isMounted && !isSpeakingRef.current) {
      setTimeout(() => {
        if (isMounted) {
          try {
            recognition.start();
            console.log("Recognition restarted");
          } catch (e) {
            if (e.name !== "InvalidStateError") console.error(e);
          }
        }
      }, 1000);
    }
  };

  recognition.onerror = (event) => {
    console.warn("Recognition error:", event.error);
    isRecognizingRef.current = false;
    setListening(false);
    if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
      setTimeout(() => {
        if (isMounted) {
          try {
            recognition.start();
            console.log("Recognition restarted after error");
          } catch (e) {
            if (e.name !== "InvalidStateError") console.error(e);
          }
        }
      }, 1000);
    }
  };

  recognition.onresult = async (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
      setAiText("");
      setUserText(transcript);
      recognition.stop();
      isRecognizingRef.current = false;
      setListening(false);
      const data = await getGeminiResponse(transcript);
      handleCommand(data);
      setAiText(data.response);
      setUserText("");
    }
  };

    const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
    greeting.lang = 'hi-IN';
   
    window.speechSynthesis.speak(greeting);
 
  return () => {
    isMounted = false;
    clearTimeout(startTimeout);
    recognition.stop();
    setListening(false);
    isRecognizingRef.current = false;
  };
}, []);

  return (
    <div className='w-full min-h-screen bg-slate-50 flex overflow-hidden'>
      {/* Sidebar / History Panel - Desktop */}
      <div className={`hidden lg:flex w-[320px] bg-white border-r border-slate-200 flex-col h-screen`}>
        <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
            <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Recent Activity</h2>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
        </div>
        
        <div className='flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar'>
          {userData.history?.map((his, idx)=>(
            <div key={idx} className='bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl text-slate-600 text-sm transition-colors border border-slate-100 shadow-sm'>
                {his}
            </div>
          ))}
          {(!userData.history || userData.history.length === 0) && (
              <div className='text-center text-slate-400 text-sm mt-10'>No recent activity</div>
          )}
        </div>
        
        <div className='p-4 border-t border-slate-100 space-y-2'>
            <button className='w-full py-3 px-4 flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all font-medium text-sm' onClick={()=>navigate("/customize")}>
                <IoSettingsOutline className='w-5 h-5'/>
                Customize Assistant
            </button>
            <button className='w-full py-3 px-4 flex items-center gap-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium text-sm' onClick={handleLogOut}>
                <IoLogOutOutline className='w-5 h-5'/>
                Log Out
            </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${ham ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={()=>setHam(false)}></div>
      
      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-[280px] h-full bg-white z-50 transform transition-transform duration-300 flex flex-col ${ham ? "translate-x-0" : "-translate-x-full"} lg:hidden shadow-2xl`}>
         <div className='p-5 border-b border-slate-100 flex items-center justify-between'>
            <h2 className='text-lg font-bold text-slate-800'>Menu</h2>
            <RxCross1 className='text-slate-500 w-6 h-6 cursor-pointer hover:text-slate-800 transition-colors' onClick={()=>setHam(false)}/>
         </div>
         <div className='flex-1 overflow-y-auto p-4 space-y-3'>
            <h3 className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1'>History</h3>
            {userData.history?.map((his, idx)=>(
                <div key={idx} className='bg-slate-50 p-3 rounded-xl text-slate-600 text-sm border border-slate-100'>
                    {his}
                </div>
            ))}
         </div>
         <div className='p-4 border-t border-slate-100 space-y-2 bg-slate-50'>
             <button className='w-full py-3 px-4 flex items-center gap-3 text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-all font-medium text-sm' onClick={()=>navigate("/customize")}>
                <IoSettingsOutline className='w-5 h-5'/>
                Settings
            </button>
            <button className='w-full py-3 px-4 flex items-center gap-3 text-rose-500 bg-white border border-rose-100 hover:border-rose-300 rounded-xl transition-all font-medium text-sm' onClick={handleLogOut}>
                <IoLogOutOutline className='w-5 h-5'/>
                Log Out
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col items-center justify-center relative p-6 bg-slate-50'>
         {/* Background blur elements */}
         <div className='absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-indigo-100 blur-[100px] opacity-60 pointer-events-none'></div>
         <div className='absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-100 blur-[100px] opacity-60 pointer-events-none'></div>

         <CgMenuRight className='lg:hidden text-slate-600 absolute top-6 left-6 w-7 h-7 cursor-pointer hover:text-slate-900 transition-colors z-30' onClick={()=>setHam(true)}/>
         
         <div className='w-full max-w-4xl flex flex-col items-center justify-center gap-8 z-10'>
             
             {/* Main Avatar Card */}
             <div className='relative group'>
                <div className={`absolute -inset-1 rounded-[2.5rem] blur-md transition-all duration-1000 ${listening ? 'bg-indigo-400 opacity-70 animate-pulse' : 'bg-slate-200 opacity-40'}`}></div>
                <div className='relative w-[280px] h-[380px] bg-white rounded-[2rem] p-3 shadow-xl overflow-hidden flex flex-col items-center justify-center border border-white/50'>
                    <img src={userData?.assistantImage} alt="Assistant Avatar" className='w-full h-full object-cover rounded-3xl shadow-inner'/>
                    <div className='absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2'>
                        <div className={`w-2 h-2 rounded-full ${listening ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`}></div>
                        <span className='text-xs font-bold text-slate-700 tracking-wide'>
                            {userData?.assistantName}
                        </span>
                    </div>
                </div>
             </div>

             {/* Communication Area */}
             <div className='w-full max-w-2xl min-h-[140px] bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center relative'>
                 
                 {!userText && !aiText && (
                    <div className='flex flex-col items-center gap-4 text-slate-400'>
                        <div className={`p-4 rounded-full bg-slate-50 border border-slate-100 ${listening ? 'text-indigo-500 animate-bounce' : ''}`}>
                            <IoMicOutline className='w-8 h-8'/>
                        </div>
                        <p className='text-sm font-medium'>Say "{userData?.assistantName}" to wake me up</p>
                    </div>
                 )}

                 {(userText || aiText) && (
                     <div className='w-full flex items-center gap-6'>
                         <div className='w-20 h-20 shrink-0 bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center p-2'>
                            {!aiText ? (
                                <img src={userImg} alt="Listening" className='w-full h-full object-contain mix-blend-multiply opacity-80'/>
                            ) : (
                                <img src={aiImg} alt="Speaking" className='w-full h-full object-contain mix-blend-multiply'/>
                            )}
                         </div>
                         
                         <div className='flex-1'>
                             <h3 className='text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2'>
                                 {aiText ? userData?.assistantName : 'You'}
                             </h3>
                             <p className='text-slate-700 text-lg md:text-xl font-medium leading-relaxed'>
                                 {aiText ? aiText : userText}
                             </p>
                         </div>
                     </div>
                 )}
             </div>

         </div>
      </div>
    </div>
  )
}

export default Home
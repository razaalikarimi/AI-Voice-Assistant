import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Customize2() {
    const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
    const [assistantName,setAssistantName]=useState(userData?.assistantName || "")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const handleUpdateAssistant=async ()=>{
        setLoading(true)
        try {
            let formData=new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                 formData.append("assistantImage",backendImage)
            }else{
                formData.append("imageUrl",selectedImage)
            }
            const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
            setLoading(false)
            setUserData(result.data)
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

  return (
    <div className='w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden'>
        {/* Soft background elements */}
        <div className='absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-200 blur-[100px] opacity-40'></div>
        <div className='absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200 blur-[120px] opacity-30'></div>

        <button className='absolute top-8 left-8 text-slate-600 hover:text-slate-900 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10' onClick={()=>navigate("/customize")}>
            <MdKeyboardBackspace className='w-6 h-6'/>
        </button>

        <div className='w-[90%] max-w-[500px] bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex flex-col items-center justify-center gap-6 p-10 relative z-10 border border-white/50'>
            <div className='text-center mb-2'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30'>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h1 className='text-slate-800 text-3xl font-bold tracking-tight mb-2'>Name your Assistant</h1>
                <p className='text-slate-500 text-sm'>What would you like to call your new companion?</p>
            </div>

            <div className='w-full relative group'>
                <input 
                    type="text" 
                    placeholder='e.g. Nova, Atlas, Shifra...' 
                    className='w-full h-14 outline-none border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all duration-300 rounded-xl text-slate-700 px-5 text-lg bg-white/80 placeholder-slate-400 font-medium text-center' 
                    required 
                    onChange={(e)=>setAssistantName(e.target.value)} 
                    value={assistantName}
                />
            </div>

            {assistantName && (
                <button 
                    className={`w-full h-14 mt-4 text-white font-medium rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        loading 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    }`} 
                    disabled={loading} 
                    onClick={handleUpdateAssistant}
                >
                    {loading ? (
                        <>
                            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                            <span>Setting up...</span>
                        </>
                    ) : (
                        <span>Finish Setup</span>
                    )}
                </button>
            )}
        </div>
    </div>
  )
}

export default Customize2
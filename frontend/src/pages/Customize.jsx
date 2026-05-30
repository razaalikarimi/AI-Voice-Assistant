import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const {serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
  const navigate=useNavigate()
     const inputImage=useRef()

     const handleImage=(e)=>{
const file=e.target.files[0]
setBackendImage(file)
setFrontendImage(URL.createObjectURL(file))
     }
  return (
    <div className='w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden'>
      {/* Soft background elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-200 blur-[100px] opacity-40'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200 blur-[120px] opacity-30'></div>

        <button className='absolute top-8 left-8 text-slate-600 hover:text-slate-900 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10' onClick={()=>navigate("/")}>
            <MdKeyboardBackspace className='w-6 h-6'/>
        </button>
        
        <div className='text-center mb-10 z-10'>
            <h1 className='text-slate-800 text-3xl md:text-4xl font-bold tracking-tight mb-3'>Choose an Avatar</h1>
            <p className='text-slate-500 text-lg'>Select a visual representation for your assistant</p>
        </div>

        <div className='w-full max-w-[1000px] flex justify-center items-center flex-wrap gap-5 z-10 mb-10'>
          <Card image={image1}/>
          <Card image={image2}/>
          <Card image={image3}/>
          <Card image={image4}/>
          <Card image={image5}/>
          <Card image={image6}/>
          <Card image={image7}/>
          
          <div className={`w-[80px] h-[150px] lg:w-[160px] lg:h-[260px] bg-white border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center transition-all duration-300 ${selectedImage=="input"?"border-indigo-500 border-solid shadow-[0_8px_30px_rgb(99,102,241,0.4)] scale-105 ring-4 ring-indigo-100 ":"border-slate-300 hover:border-indigo-400 hover:bg-slate-50 hover:-translate-y-1"}` } onClick={()=>{
              inputImage.current.click()
              setSelectedImage("input")
          }}>
              {!frontendImage ? (
                  <div className='flex flex-col items-center gap-2 text-slate-400'>
                      <RiImageAddLine className='w-8 h-8'/>
                      <span className='text-xs font-medium'>Upload Custom</span>
                  </div>
              ) : (
                  <img src={frontendImage} className='w-full h-full object-cover'/>
              )}
          </div>
          <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
      </div>
      
      {selectedImage && (
          <button 
              className='min-w-[200px] h-14 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 z-10' 
              onClick={()=>navigate("/customize2")}
          >
              Continue
          </button>
      )}
    </div>
  )
}

export default Customize

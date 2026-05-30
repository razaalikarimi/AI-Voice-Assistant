import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Card({image}) {
      const {serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
  return (
    <div className={`w-[80px] h-[150px] lg:w-[160px] lg:h-[260px] bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage==image?"border-indigo-500 shadow-[0_8px_30px_rgb(99,102,241,0.4)] scale-105 ring-4 ring-indigo-100 ":"border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1"}`} onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
        }}>
      <img src={image} className='w-full h-full object-cover'  />
    </div>
  )
}

export default Card

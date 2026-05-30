import React, { useContext, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const { serverUrl, setUserData } = useContext(userDataContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [focusedField, setFocusedField] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name, email, password
      }, { withCredentials: true })
      setUserData(result.data)
      setLoading(false)
      navigate("/customize")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false)
      setErr(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center relative overflow-hidden bg-slate-50'>
      {/* Soft gradient background elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-200 blur-[100px] opacity-60'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-200 blur-[120px] opacity-50'></div>
      <div className='absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-100 blur-[90px] opacity-60'></div>
      
      <form 
        className='w-[90%] max-w-[420px] bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex flex-col items-center justify-center gap-4 p-10 relative z-10 border border-white/50' 
        onSubmit={handleSignUp}
      >
        <div className='text-center mb-2'>
          <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-500/30'>
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h1 className='text-slate-800 text-3xl font-semibold mb-2 tracking-tight'>
            Create Account
          </h1>
          <p className='text-slate-500 text-sm'>
            Get started with your virtual assistant
          </p>
        </div>

        <div className='w-full'>
          <label className='block text-xs font-medium text-slate-500 mb-1.5 ml-1'>Full Name</label>
          <div className='relative group'>
            <input 
              type="text" 
              placeholder='John Doe' 
              className={`w-full h-12 outline-none border transition-all duration-300 rounded-xl text-slate-700 px-4 text-sm bg-white/50 ${
                focusedField === 'name' 
                  ? 'border-indigo-400 ring-4 ring-indigo-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`} 
              required 
              onChange={(e) => setName(e.target.value)} 
              value={name}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
            />
          </div>
        </div>

        <div className='w-full'>
          <label className='block text-xs font-medium text-slate-500 mb-1.5 ml-1'>Email</label>
          <div className='relative group'>
            <input 
              type="email" 
              placeholder='name@example.com' 
              className={`w-full h-12 outline-none border transition-all duration-300 rounded-xl text-slate-700 px-4 text-sm bg-white/50 ${
                focusedField === 'email' 
                  ? 'border-indigo-400 ring-4 ring-indigo-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`} 
              required 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
            />
          </div>
        </div>

        <div className='w-full'>
          <label className='block text-xs font-medium text-slate-500 mb-1.5 ml-1'>Password</label>
          <div className='relative group'>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='••••••••' 
              className={`w-full h-12 outline-none border transition-all duration-300 rounded-xl text-slate-700 px-4 pr-12 text-sm bg-white/50 ${
                focusedField === 'password' 
                  ? 'border-indigo-400 ring-4 ring-indigo-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`} 
              required 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
            />
            <button
              type="button"
              className='absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <IoEye className='w-5 h-5' /> : <IoEyeOff className='w-5 h-5' />}
            </button>
          </div>
        </div>

        {err.length > 0 && (
          <div className='w-full bg-red-50 border border-red-100 rounded-xl p-3 mt-1'>
            <p className='text-red-600 text-xs text-center font-medium'>
              {err}
            </p>
          </div>
        )}

        <button 
          className={`w-full h-12 mt-4 text-white font-medium rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            loading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          }`} 
          disabled={loading}
        >
          {loading ? (
            <>
              <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create account</span>
          )}
        </button>

        <p className='text-slate-500 text-sm text-center mt-4'>
          Already have an account?{' '}
          <span 
            className='text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium transition-colors hover:underline underline-offset-4' 
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp

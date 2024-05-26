import { useState,useCallback,useEffect, useRef} from 'react'
import './index.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed,setnumberallowed]= useState(false)
  const [charterallowed,setcharallowed] = useState(false)
  const [Password,setPassword] = useState("")
  const [buttonText, setButtonText] = useState('Click');

 
// USE REF HOOK
const passwordRef = useRef(null)


  const passwordgenerator =  useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzz"
    if(numberallowed) str += "0123456789"
    if(charterallowed) str +="!@#$%^&*()"
     for (let i = 1; i <=length; i++){
       let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
  
     }
     setPassword(pass)
     
    

  },[length,numberallowed,charterallowed,setPassword])

  const copypassword= useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
    setButtonText("copied");
          setTimeout(() => {
            setButtonText("click");
          }, 750);
  
     
  },[Password])
  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,charterallowed,passwordgenerator])
  return (
    <>
    
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center">
   <h1 className="text-white text-center my-3">PASSWORD GENERATOR</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text" 
      value={Password}
      className="outline-none w-full py-1 px-3"
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button
      onClick={copypassword}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
     
      
      >{buttonText}</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={() => {
              setnumberallowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charterallowed}
              id="characterInput"
              onChange={() => {
                  setcharallowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
   </div>
   </div>
    </>
  )
}

export default App

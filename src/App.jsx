import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) {
      str += "1234567890"
    }

    if(charAllowed)
    {
      str+="!@#$%^&*"
    }

    for (let i = 1; i <= length; i++) {
      
      let randomIndex = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(randomIndex) 
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword] )

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
       <h1 className='text-white text-center my-3'>Password generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
       <button className='outline-none bg-blue-700 text-white px-3.5 py-2.0 shrink-0 cursor-pointer'
        onClick={copyToClipboard}
      > copy</button>

      </div>

      <div className='flex text-sm gap-x-8'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={12}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />

          <label>Length: {length}</label>
        </div>


        <div className='flex items-center gap-x-5'>
          <input 
          type="checkbox"
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={() => {
            setNumAllowed((prev) => !prev)
          }} />

          <label>Numbers</label>

          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }} />
          <label>Special Characters</label>

        </div>



      </div>

    </div>
  )
}

export default App

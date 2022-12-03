import { useEffect, useState } from 'react'

import './App.css'

type letter={
  value:string,
  clicked:boolean
}

const wordArray=['beekeeper','espionage','knapsack','jawbreaker','haphazard','megahertz','pneumonia','razzmatazz',
'zigzagging','yachtsman','wristwatch','voyeurism','thumbscrew','syndrome','thriftless']

const letterArray='QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map((elem)=>{
  return {value:elem,
          clicked:false}
})




function App() {

  const [letters,setletters] =useState<letter[]>(letterArray)
  const [highlight,sethighlight]=useState<number>(-1)
  const [lifes,setlifes] =useState<number>(6)
  const [word,setword] =useState<string>('')
  const [found,setfound] = useState<number>(0)

  useEffect(()=>{
   setword(wordArray.map((elem)=>elem.toUpperCase())[Math.floor(wordArray.length * Math.random())])
  },[])

  useEffect(()=>{
    
    const unsub=setTimeout(()=>{
      if (lifes == 0) alert(`Bad luck the word was ${word} refresh to play again`)

      if(found == word.length && word.length) alert('Well played refresh to play again')

    },1000)

     return ()=>{clearTimeout(unsub)}

  },[lifes,found])

  return (
    <div className="App">
      <div className="hangman">
        <div className="hang-1"></div>
        <div className="hang-2"></div>
        <div className="hang-3"></div>
        <div className="hang-4"></div>

        {lifes <6 ?    <div className="human-1"></div> : null}
        {lifes <5 ?    <div className="human-2"></div> : null}
        {lifes <4 ?    <div className="human-3"></div> : null}
        {lifes <3 ?    <div className="human-4"></div> : null}
        {lifes <2 ?    <div className="human-5"></div> : null}
        {lifes <1 ?    <div className="human-6"></div> : null}

      </div>

      <div className="displayletter">
        {word.split('').map((elem,index)=>{
          return <div key={index} className='letterbox'>{letters.find((letter)=> {return letter.value == elem})?.clicked ? elem : ''}</div>
        })}
      </div>
      
      <div className="keyboard">
        {letters.map((elem,index)=>{
          return <div key={index} onMouseEnter={()=>{sethighlight(index)}}
                      onMouseLeave={()=>{sethighlight(-1)}}
                      tabIndex={0}
          className={`letter ${highlight == index ? 'highlighted' : ''} ${elem.clicked ? word.indexOf(elem.value) >=0 ? 'right' : 'wrong' : ''}`}
          onClick={()=>{
            
            if (lifes == 0 || elem.clicked || found == word.length ) return

            setletters((prev)=>{
              return prev.map((l,i)=>{return i == index ? {...l,clicked:true} : l})
            })

            if (word.indexOf(elem.value) < 0) {setlifes((prev)=>prev-1)}
            else{setfound((prev)=>{ 
              let local =0
              for (let i of word){
                if (i == elem.value) local++
              }
              return prev + local})}
            
          }} >{elem.value}</div>
        })}
      </div>
    </div>
  )
}

export default App

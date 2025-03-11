import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div style={{ height: '70px' }}></div>
      <Hero />
    </>
  )
}

function Header() {
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, width: '100vw',  
    display: 'flex', justifyContent: 'space-around', alignItems: 'right', padding: '25px 20px' }}>
      <div style={{ flex: 4 }}></div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '0 20px' }}>
        <a href='./resume.pdf' target='_blank'>resume</a>
        <a href='https://www.linkedin.com/in/shen-xiaotong/' target='_blank'>contact</a>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <>
      <h1>Xiaotong Shen</h1>
      <p>Software Developer</p>
      <div style={{ height: '10px' }}></div>
      <div style={{ height: '10px' }}></div>
      <img src={'src/assets/star.png'} alt="star" width={100} height={100}/>
    </>
  )
}

export default App

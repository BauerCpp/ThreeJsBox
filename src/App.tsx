import { useState, useEffect, useRef } from 'react'
import './App.css'
import SizeForm from './components/Form';
import MyBox from './entities/MyBox';


import { Canvas } from '@react-three/fiber'
import createCuboidGeometry from './js/api.js'

const position = [0, 100, 300];
const color = [ 0.0018211619011764706, 0.008023192982520563, 0.019382360952473074 ];

console.log(color)
function Scene(props) {
  return (
    <Canvas camera={{ position: position}} >
      <color
        attach="background"
        args={[...color]}
      />
      {/* <spotLight position={position} color="yellow" angle={0.9} penumbra={0.0} decay={0} intensity={Math.PI / 2 } /> */}
      <pointLight position={position} color="white" decay={0.1} intensity={Math.PI } />
      {/* <ambientLight intensity={0.2} />
      <directionalLight intensity={1} /> */}
      <MyBox
        meshData={props.meshData}
        wireframe={false}
      />
    </Canvas>
  )
}

export default function App() {
  const [meshData, setmeshData] = useState(createCuboidGeometry(100, 150, 100))

    return (
      <div className='container'>
        <SizeForm onSubmit={(w, h, d) => setmeshData(createCuboidGeometry(w, h, d))} />
        <Scene meshData={meshData}/>
      </div>
  )
}
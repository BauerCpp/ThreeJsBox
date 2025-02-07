import { useContext, useEffect, useState } from 'react';
import './App.css';
import SizeForm from './components/Form';
import MyBox from './entities/MyBox';
import { Canvas } from '@react-three/fiber';
import fetchCuboidGeometry from './js/api.js';
import { ThemeContext, THEMES, Theme } from './context/context.js';
import * as THREE from 'three';

const position: [number, number, number] = [0, 100, 300];
const initial_values = {width: 100, height: 150, length: 100};
interface SceneProps {
  meshData: THREE.BufferGeometry;
}

function Scene({ meshData }: SceneProps) {
  const theme = useContext(ThemeContext);

  return (
    <Canvas camera={{ position: position }}>
      <color attach="background" args={THEMES[theme].canvasBackground} />
      <pointLight position={position} color="white" decay={0.1} intensity={Math.PI} /> {/* Added position */}
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1} />
      <MyBox meshData={meshData} wireframe={false} /> {/* Added wireframe prop and fixed typo*/}
    </Canvas>
  );
}

export default function App() {
  const [meshData, setMeshData] = useState<THREE.BufferGeometry>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(
    () =>
    {
      async function getGeometry() {
          return (await fetchCuboidGeometry(initial_values))
      }
      getGeometry().then(
        (result) => setMeshData(result)
      )
    },
    []

  )
  console.log(meshData)
  const handleFormSubmit = async (width: number, height: number, length: number) => {
    setMeshData((await fetchCuboidGeometry({width, height, length})));
  };

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="container">
        <SizeForm initialValues={initial_values} onSubmit={handleFormSubmit} onThemeChange={handleThemeChange} />
        <Scene meshData={meshData} />
      </div>
    </ThemeContext.Provider>
  );
}
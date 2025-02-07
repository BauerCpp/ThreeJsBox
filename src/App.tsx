import { useContext, useEffect, useState } from 'react';
import './App.css';
import SizeForm from './components/Form';
import MyBox from './entities/MyBox';
import SkyBox from './entities/SkyBox.tsx'
import { Canvas } from '@react-three/fiber';
import fetchCuboidGeometry from './js/api.js';
import { ThemeContext, THEMES, Theme } from './context/context.js';
import * as THREE from 'three';
import { Spin } from 'antd';

const position: [number, number, number] = [0, 100, 300];
const initial_values = {width: 100, height: 150, length: 100};
interface SceneProps {
  meshData: THREE.BufferGeometry;
}

function Scene({ meshData }: SceneProps) {
  const theme = useContext(ThemeContext);

  return (
    <Canvas camera={{ position: position }}>
      {/* */}
      <pointLight position={position} color="white" decay={0.1} intensity={Math.PI} /> {/* Added position */}
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1} />
      {theme === 'light' ? <SkyBox /> : <color attach="background" args={THEMES[theme].canvasBackground} />}
      {meshData && <MyBox meshData={meshData} wireframe={false} />}{/* Added wireframe prop and fixed typo*/}
    </Canvas>
  );
}

export default function App() {
  const [meshData, setMeshData] = useState<THREE.BufferGeometry>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(
    () =>
    {
      async function getGeometry() {
          setLoading(true)
          return (await fetchCuboidGeometry(initial_values))
      }
      getGeometry().then(
        (result) =>
        {
          setMeshData(result)
          setLoading(false);
        }
      )
    },
    []
  )
  console.log(meshData)
  const handleFormSubmit = async (width: number, height: number, length: number) => {
    setLoading(true);
    setMeshData(null);
    setMeshData((await fetchCuboidGeometry({width, height, length})));
    setLoading(false);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={theme}>
      {
        loading &&
          <Spin size='large' fullscreen />
      }
      <div className="container">
        <SizeForm initialValues={initial_values} onSubmit={handleFormSubmit} onThemeChange={handleThemeChange} />
        <Scene meshData={meshData} />
      </div>
    </ThemeContext.Provider>
  );
}
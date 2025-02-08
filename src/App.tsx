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
import {
  CubeTexture,
  CubeTextureLoader,
  LoadingManager,
} from "three";

import imgUrl1 from './Texture/blue1/0001.jpg';
import imgUrl2 from './Texture/blue1/0002.jpg';
import imgUrl3 from './Texture/blue1/0003.jpg';
import imgUrl4 from './Texture/blue1/0004.jpg';
import imgUrl5 from './Texture/blue1/0005.jpg';
import imgUrl6 from './Texture/blue1/0006.jpg';

const position: [number, number, number] = [0, 100, 300];
const initial_values = {width: 100, height: 150, length: 100};

const imageUrls = [
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  imgUrl5,
  imgUrl6,
];

interface SceneProps {
  meshData: THREE.BufferGeometry;
  setLoading: (arg0: boolean) => void;
}

function Scene(props) {
  const theme = useContext(ThemeContext);
  console.log('props', props)
  return (
    <Canvas camera={{ position: position }}>
      {/* */}
      <pointLight position={position} color="white" decay={0.1} intensity={Math.PI} /> {/* Added position */}
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1} />
      {theme === 'light' ? <SkyBox texture={props.texture}/> : <color attach="background" args={THEMES[theme].canvasBackground} />}
      {props.meshData && <MyBox meshData={props.meshData} wireframe={false} />}{/* Added wireframe prop and fixed typo*/}
    </Canvas>
  );
}

export default function App() {
  const [meshData, setMeshData] = useState<THREE.BufferGeometry>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState<Boolean>(true);
  const [texture, setTexture] = useState<CubeTexture>();

  useEffect(
    () =>
    {
      async function getGeometry() {
          setLoading(true)
          return (await fetchCuboidGeometry(initial_values))
      }
      async function getTexture() {
        const textureLoader = new CubeTextureLoader();

        textureLoader.load(
          imageUrls,
          (texture: CubeTexture) => {
            console.log("CubeTexture loaded:", texture);
            setTexture(texture);
          },
          undefined, // onProgress callback (optional)
          (error) => {
            console.error("An error happened while loading the CubeTexture:", error);
            setLoading(false); // Ensure loading is set to false even on error
          }
        );
      }
      getTexture();
      getGeometry()
        .then(
          (result) =>
          {
            setMeshData(result)
            setLoading(false);
          }
        )
    },
    []
  );

  useEffect(() => {

  }, [imageUrls]);
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
        <Scene meshData={meshData} setLoading={setLoading} texture={texture}/>
      </div>
    </ThemeContext.Provider>
  );
}
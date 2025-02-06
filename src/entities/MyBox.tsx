import { useRef, useState, useEffect, useMemo} from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function MyBox(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef();
  const ref2 = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [rotate, setRotate] = useState(true)

  const loadModelData = (url) => {
    // load a resource
    loader.load(
      // resource URL
      'models/json/pressure.json',
      // onLoad callback
      function ( geometry ) {
        const material = new THREE.MeshLambertMaterial( { color: 0xF5F5F5 } );
        const object = new THREE.Mesh( geometry, material );
        scene.add( object );
      },

      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      // onError callback
      function ( err ) {
        console.log( 'An error happened' );
      }
    );
  }

  useEffect(() => {
    console.log('rerender')
    // ref.current.rotation.y += ;
    // ref.current.rotation.z += delta;
    // ref2.current.rotation.z = ref.current.rotation.z;
    // ref.current.geometry.computeVertexNormals() ;
    // ref2.current.geometry.getAttribute( 'position' ).needsUpdate = true;
  }, []);
  useEffect(() => {
    console.log('rerender')
    ref.current.geometry.getAttribute( 'position' ).needsUpdate = true;
    ref2.current.geometry.getAttribute( 'position' ).needsUpdate = true;
  });

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    {
      if (rotate)
      {
        ref.current.rotation.y += delta / 4;
        ref2.current.rotation.y = ref.current.rotation.y;
      }
    })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <group {...props} >
    <mesh
      {...props}
      ref={ref}
      position={[0, 0, 0]}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={props.meshData.vertices.length / 3}
          array={props.meshData.vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={props.meshData.indices}
          count={props.meshData.indices.length}
          itemSize={1}
        />
        <bufferAttribute
            attach='attributes-normal'
            array={props.meshData.normals}
            count={props.meshData.normals.length / 3}
            itemSize={3}
        />
      </bufferGeometry>
      <meshPhongMaterial
        color={0xffffff}
        // wireframe={true}
      />
    </mesh>
    <mesh ref={ref2} scale={active ? 1.501 : 1.001}>
        <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={props.meshData.vertices.length / 3}
          array={props.meshData.vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={props.meshData.indices}
          count={props.meshData.indices.length}
          itemSize={1}
        />
        <bufferAttribute
            attach='attributes-normal'
            array={props.meshData.normals}
            count={props.meshData.normals.length / 3}
            itemSize={3}
        />
      </bufferGeometry>
        <meshPhongMaterial
          color={0x000fff}
          wireframe={true}
        />
      </mesh>
    {/* <mesh
      // position={[1, 2, 3]}
      ref={ref2}
      scale={active ? 1.5 : 1}
    >
        <lineSegments>
        <bufferAttribute
          attach="attributes-position"
          count={props.meshData.vertices.length / 3}
          array={props.meshData.vertices} itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={props.meshData.indices}
          count={props.meshData.indices.length}
          itemSize={1}
        />
        </lineSegments>
      <meshLineMaterial/>
    </mesh> */}
    </group>
  )
};

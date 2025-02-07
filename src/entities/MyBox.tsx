import { useRef, useState, useEffect, useMemo, useContext } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ThemeContext, THEMES } from '../context/context';

interface MyBoxProps extends THREE.GroupProps {
    meshData: {
        vertices: Float32Array;
        indices: Uint32Array | Uint16Array;
        normals: Float32Array;
    };
    color?: THREE.ColorRepresentation;
    wireframe?: boolean;
}

export default function MyBox(props: MyBoxProps) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef<THREE.Mesh>(null);
    const wireframeMeshRef = useRef<THREE.Mesh>(null);
    const theme = useContext(ThemeContext);

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [rotate, setRotate] = useState(true);

    const { meshData, color = 'hotpink', wireframe = false, ...groupProps } = props;

    // Memoize the BufferAttributes to avoid unnecessary re-creations

    const positionAttribute = useMemo(() => new THREE.BufferAttribute(meshData.vertices, 3), [meshData.vertices]);
    const indexAttribute = useMemo(() => new THREE.BufferAttribute(meshData.indices, 1), [meshData.indices]);
    const normalAttribute = useMemo(() => new THREE.BufferAttribute(meshData.normals, 3), [meshData.normals]);



      // useEffect(() => {
      //     console.log('rerender')
      //     // ref.current.rotation.y += ;
      //     // ref.current.rotation.z += delta;
      //     // ref2.current.rotation.z = ref.current.rotation.z;
      //     // ref.current.geometry.computeVertexNormals() ;
      //     // ref2.current.geometry.getAttribute( 'position' ).needsUpdate = true;
      // }, []);

      useEffect(() => {
          if (meshRef.current) {
              meshRef.current.geometry.attributes.position.needsUpdate = true;
          }
          if (wireframeMeshRef.current) {
              wireframeMeshRef.current.geometry.attributes.position.needsUpdate = true;
          }
      }, [meshData]);  // Add meshData as a dependency, so it runs when meshData changes

      // Subscribe this component to the render-loop, rotate the mesh every frame
      useFrame((state, delta) => {
          if (rotate && meshRef.current) {
              meshRef.current.rotation.y += delta / 4;
              if (wireframeMeshRef.current) {
                wireframeMeshRef.current.rotation.y = meshRef.current.rotation.y;
              }
          }
      });

    const scale = active ? 1.5 : 1;
    const wireframeScale = active ? 1.501 : 1.001;


    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group {...groupProps}>
            <mesh
                ref={meshRef}
                position={[0, 0, 0]}
                scale={scale}
                onClick={(event) => setActive(!active)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
            >
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positionAttribute.array}
                        itemSize={positionAttribute.itemSize}
                        count={positionAttribute.count}
                    />
                    <bufferAttribute
                        attach="index"
                        array={indexAttribute.array}
                        itemSize={indexAttribute.itemSize}
                        count={indexAttribute.count}
                    />
                    <bufferAttribute
                        attach="attributes-normal"
                        array={normalAttribute.array}
                        itemSize={normalAttribute.itemSize}
                        count={normalAttribute.count}
                    />
                </bufferGeometry>
                <meshPhongMaterial
                    color={color}
                />
            </mesh>
            <mesh ref={wireframeMeshRef} scale={wireframeScale} visible={THEMES[theme].wireframe}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positionAttribute.array}
                        itemSize={positionAttribute.itemSize}
                        count={positionAttribute.count}
                    />
                    <bufferAttribute
                        attach="index"
                        array={indexAttribute.array}
                        itemSize={indexAttribute.itemSize}
                        count={indexAttribute.count}
                    />
                    <bufferAttribute
                        attach="attributes-normal"
                        array={normalAttribute.array}
                        itemSize={normalAttribute.itemSize}
                        count={normalAttribute.count}
                    />
                </bufferGeometry>
                <meshPhongMaterial
                    color={'black'}
                    wireframe={true}
                />
            </mesh>
        </group>
    );
}
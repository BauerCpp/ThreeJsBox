import {
  CubeTextureLoader,
} from "three";
import imgUrl1 from '../Texture/blue1/0001.jpg'
import imgUrl2 from '../Texture/blue1/0002.jpg'
import imgUrl3 from '../Texture/blue1/0003.jpg'
import imgUrl4 from '../Texture/blue1/0004.jpg'
import imgUrl5 from '../Texture/blue1/0005.jpg'
import imgUrl6 from '../Texture/blue1/0006.jpg'

import { useThree } from "@react-three/fiber";
// console.log('image,', imgUrl)
export default function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    imgUrl1,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    imgUrl5,
    imgUrl6
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}
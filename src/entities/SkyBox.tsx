
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CubeTexture } from "three";


interface SkyBoxProps {
	texture: CubeTexture;
}

const SkyBox: React.FC<SkyBoxProps> = ({ texture }) => {
	const { scene } = useThree();
	useEffect( () =>
	{
		scene.background = texture;
	}, [scene, texture])
	return null;
};

export default SkyBox;

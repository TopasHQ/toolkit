import { Plane } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, MeshBasicMaterial } from 'three';

import { centerRef } from '../utils';

type Props = { callback?: Function; delay?: number };

export const FadeToBlack = ({ callback, delay = 0 }: Props) => {
  const [showFade, setShowFade] = useState(false);
  const boxRef = useRef<Group>();
  const meshRef = useRef<MeshBasicMaterial>(null);
  const cam = useThree(state => state.camera);

  const onFadeFinish = () => {
    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const id = setTimeout(() => setShowFade(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  useFrame((_, dt) => {
    centerRef(cam, boxRef, [0, 0, -0.2]);

    if (!meshRef.current) {
      return;
    }

    if (meshRef.current.opacity >= 1) {
      onFadeFinish();
    } else {
      meshRef.current.opacity += dt / 4;
    }
  });

  if (!showFade) {
    return null;
  }

  return (
    <Plane ref={boxRef} scale={3}>
      <meshBasicMaterial ref={meshRef} color="black" transparent opacity={0} />
    </Plane>
  );
};

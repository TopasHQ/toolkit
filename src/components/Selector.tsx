import { animated, useSpring } from '@react-spring/three';
import { Float, Shadow, Sparkles, Sphere as SphereDrei } from '@react-three/drei';
import { Interactive, XRInteractionEvent } from '@react-three/xr';
import { ReactElement, useState } from 'react';
import { Vector3 } from 'three';

import { isInRange } from '../utils';

type Props = {
  onSelect: () => void;
  color: string;
  position: Vector3;
};

const selectorDistance = 10;

export const Selector = ({ onSelect, color, position }: Props): ReactElement => {
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({ scale: hovered ? 1.2 : 1 });

  const handleHover = (event: XRInteractionEvent) => {
    isInRange(event, selectorDistance) && setHovered(true);
  };

  const handleBlur = () => {
    setHovered(false);
  };

  const handleOnSelect = (event: XRInteractionEvent) => {
    isInRange(event, selectorDistance) && onSelect();
  };

  return (
    <animated.group position={position} scale={scale}>
      <Float>
        <Interactive onHover={handleHover} onBlur={handleBlur} onSelect={handleOnSelect}>
          <Globe color={color} />
        </Interactive>
      </Float>

      <Shadow />
    </animated.group>
  );
};

const Globe = ({ color }: { color: string }): ReactElement => {
  return (
    <>
      <SphereDrei scale={0.5} position={[0, 1, 0]} args={[1, 10, 10]}>
        <meshStandardMaterial transparent opacity={0.4} wireframe color={color} />
      </SphereDrei>

      <Sparkles position={[0, 1.1, 0]} size={1.5} scale={1} color={color} />
    </>
  );
};

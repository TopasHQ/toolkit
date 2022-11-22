import { animated, useSpring } from '@react-spring/three';
import { Float, Shadow, Sparkles, Sphere as SphereDrei } from '@react-three/drei';
import { Interactive, XRInteractionEvent } from '@react-three/xr';
import { ReactElement, useState } from 'react';
import { Vector3 } from 'three';

import { isInRange } from '../utils';

const selectorDistance = 10;

type SelectorProps = {
  onSelect: () => void;
  color: string;
  position: Vector3;
  sparklesCount?: number;
  customComponent?: ({ color }: GlobeProps) => JSX.Element;
};

export const Selector = ({
  onSelect,
  color,
  position,
  sparklesCount = 50,
  customComponent,
}: SelectorProps): ReactElement => {
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

  const Component = customComponent || Globe;

  return (
    <animated.group position={position} scale={scale}>
      <Float>
        <Interactive onHover={handleHover} onBlur={handleBlur} onSelect={handleOnSelect}>
          <Component color={color} />
          <Sparkles position={[0, 1.1, 0]} size={1.5} scale={1} color={color} count={sparklesCount} />
        </Interactive>
      </Float>
      <Shadow />
    </animated.group>
  );
};

type GlobeProps = {
  color: string;
};

const Globe = ({ color }: GlobeProps) => {
  return (
    <SphereDrei scale={0.5} position={[0, 1, 0]} args={[1, 10, 10]}>
      <meshStandardMaterial transparent opacity={0.4} wireframe color={color} />
    </SphereDrei>
  );
};

import { useFrame } from '@react-three/fiber';
import { Interactive, useController, useXR } from '@react-three/xr';
import { useCallback, useRef, useState } from 'react';
import { Group, Raycaster, Vector3 } from 'three';

export type PositionalRestriction = { x: [number, number]; z: [number, number]; cb?: Function };

const isValidPosition = (position: Vector3, restriction: PositionalRestriction) => {
  let isValid = true;

  if (
    position.x > restriction.x[0] &&
    position.x < restriction.x[1] &&
    position.z > restriction.z[0] &&
    position.z < restriction.z[1]
  ) {
    isValid = false;
  }

  return isValid;
};

const Indicator = () => (
  <mesh position={[0, 0.25, 0]}>
    <coneBufferGeometry args={[0.2, 0.7, 12]} attach='geometry' />
    <meshPhongMaterial
      color='#a347ff'
      emissive='#a347ff'
      emissiveIntensity={1}
      transparent={true}
      opacity={0.7}
    />
  </mesh>
);

type Props = {
  children: any;
  positionalRestriction?: PositionalRestriction;
  hand?: "left" | "right";
};

export const TeleportTravel = ({ children, positionalRestriction, hand = "right" }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const target = useRef<Group>(null);
  const targetLoc = useRef<Group>(null);
  const ray = useRef(new Raycaster());

  const rayDir = useRef({
    pos: new Vector3(),
    dir: new Vector3(),
  });

  const { player } = useXR();
  const controller = useController(hand);

  useFrame(() => {
    if (!(isHovered && controller && ray.current && target.current && targetLoc.current)) {
      return;
    }

    controller.controller.getWorldDirection(rayDir.current.dir);
    controller.controller.getWorldPosition(rayDir.current.pos);
    rayDir.current.dir.multiplyScalar(-1);
    ray.current.set(rayDir.current.pos, rayDir.current.dir);

    const [intersection] = ray.current.intersectObject(target.current);

    if (intersection?.object?.name === "traversable") {
      const p = intersection.point;
      targetLoc.current.position.set(0, 0, 0);
      const n = intersection.face?.normal.clone();

      if (!n) {
        return;
      }

      n.transformDirection(intersection.object.matrixWorld);
      targetLoc.current.lookAt(n);
      targetLoc.current.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);
      targetLoc.current.position.copy(p);
      targetLoc.current.visible = true;
    } else {
      targetLoc.current.visible = false;
    }
  });

  const onSelect = useCallback(
    props => {
      /** ignore other hand */
      if (props.target.inputSource.handedness !== hand) {
        return;
      }

      if (!target.current || !targetLoc.current) {
        return;
      }

      if (
        isHovered &&
        ray.current.intersectObject(target.current)[0].object.name === "traversable"
      ) {
        const newPlayerPosition = new Vector3(
          targetLoc.current.position.x,
          0,
          targetLoc.current.position.z
        );

        if (positionalRestriction && !isValidPosition(newPlayerPosition, positionalRestriction)) {
          if (positionalRestriction.cb) {
            positionalRestriction.cb();
          }

          console.debug("Not allowed to go here");
          return;
        }

        player.position.copy(newPlayerPosition);
        player.rotation.copy(player.rotation);
      }
    },
    [isHovered, player.rotation, player.position, positionalRestriction]
  );

  return (
    <>
      {isHovered && (
        <group ref={targetLoc}>
          <Indicator />
        </group>
      )}

      <group ref={target}>
        <Interactive
          onSelect={onSelect}
          onHover={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {children}
        </Interactive>
      </group>
    </>
  );
};

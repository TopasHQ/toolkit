import { useFrame } from '@react-three/fiber';
import { useController, useXR } from '@react-three/xr';
import { useState } from 'react';

export const ThumbStickRotation = ({ hand = "right" }: { hand?: "left" | "right" }) => {
  const [ignoreInput, setIgnoreInput] = useState(false);

  const controller = useController(hand);

  const { player } = useXR();

  const rotate = (direction: "left" | "right") => {
    if (ignoreInput) {
      return;
    }

    setIgnoreInput(true);

    player.rotateY(direction === "left" ? Math.PI / 4 : -Math.PI / 4);
  };

  useFrame(() => {
    const yRotation = controller?.inputSource.gamepad?.axes[2];

    if (yRotation !== undefined) {
      if (yRotation === 0) {
        setIgnoreInput(false);
      }

      if (yRotation < -0.2) {
        rotate("left");
      }

      if (yRotation > 0.2) {
        rotate("right");
      }
    }
  });

  return null;
};

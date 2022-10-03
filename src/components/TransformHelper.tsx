import { TransformControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

type Props = {
  children: any;
  initMode?: HelperMode;
};

type HelperMode = "translate" | "rotate" | "scale" | undefined;

export const TransformHelper = ({
  children,
  initMode = "translate",
}: Props): React.ReactElement => {
  const [mode, setMode] = useState<HelperMode>(initMode);
  const ref = useRef<any>(null);

  useHotkeys("ctrl+l", () => logData());
  useHotkeys("ctrl+m", () => switchMode());

  const switchMode = () => {
    setMode(prevMode => {
      if (prevMode === "translate") {
        return "rotate";
      }

      if (prevMode === "rotate") {
        return "scale";
      }

      if (prevMode === "scale") {
        return "translate";
      }

      return initMode;
    });
  };

  const logData = () => {
    if (!ref.current) {
      return;
    }

    const { position, rotation, scale } = ref.current.object;

    console.debug("\n\n", "LOGGING DATA:", "\n\n");

    console.debug("Position: ", position);
    console.debug("Rotation: ", rotation);
    console.debug("Scale: ", scale);

    console.debug("Position copy paste:\n", JSON.stringify([position.x, position.y, position.z]));
    console.debug("Rotation copy paste:\n", JSON.stringify([rotation.x, rotation.y, rotation.z]));
    console.debug("Scale copy paste:\n", JSON.stringify([scale.x, scale.y, scale.z]));
  };

  return (
    <TransformControls ref={ref} mode={mode} object={children.ref}>
      {children}
    </TransformControls>
  );
};

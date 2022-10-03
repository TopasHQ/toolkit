import { OrbitControls, Stats } from '@react-three/drei';

export const DevTools = (): React.ReactElement => {
  return (
    <>
      <OrbitControls makeDefault />
      <Stats />
    </>
  );
};

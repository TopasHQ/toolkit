import { Camera } from '@react-three/fiber';
import { Vector3 } from 'three';

export const centerRef = (cam: Camera, ref: React.RefObject<any>, vectorPosition = [0, 0, 0]) => {
  cam.updateProjectionMatrix();

  const [x, y, z] = vectorPosition;
  const zCamVec = new Vector3(x, y, z);

  const position = cam.localToWorld(zCamVec);

  if (ref.current) {
    ref.current.position.set(position.x, position.y, position.z);
    ref.current.lookAt(cam.position);
  }
};

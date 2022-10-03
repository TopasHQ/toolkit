import { XRInteractionEvent } from '@react-three/xr';

export const isInRange = (event: XRInteractionEvent, selectorDistance: number) => {
  if (!event.intersection) {
    return false;
  }
  return event.intersection.distance < selectorDistance;
};

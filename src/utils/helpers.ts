import { XRInteractionEvent } from '@react-three/xr';
import { v4 as uuidv4 } from 'uuid';

export const isInRange = (event: XRInteractionEvent, selectorDistance: number) => {
  if (!event.intersection) {
    return false;
  }
  return event.intersection.distance < selectorDistance;
};

export const getRandomElementFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

export const getRandomNumberBetweenRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

export const generateId = () => uuidv4();

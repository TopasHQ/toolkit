import { useXR } from '@react-three/xr';
import { useEffect } from 'react';
import useSound from 'use-sound';

type Props = {
  file: string;
  volume?: number;
};

const DEFAULT_VOLUME = 0.15;
const FADE_TIME = 1000;

export const BackgroundMusic = ({ file, volume }: Props) => {
  const [play, { stop, sound }] = useSound(file, { loop: true });

  const { session } = useXR();

  const vol = volume || DEFAULT_VOLUME;

  useEffect(() => {
    // Don't play music when not in VR
    if (!session) {
      return;
    }

    const startSound = () => {
      if (!sound) return;
      sound.fade(0, vol, FADE_TIME);
      play();
    };

    const endSound = () => {
      if (!sound) return;
      sound.fade(vol, 0, FADE_TIME);
      setTimeout(() => stop(), FADE_TIME);
    };

    startSound();

    return () => {
      endSound();
    };
  }, [play, stop, sound, vol, session]);

  return null;
};

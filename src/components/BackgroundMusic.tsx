import { useXR } from '@react-three/xr';
import { useEffect } from 'react';
import useSound from 'use-sound';

type Props = {
  file: string;
  volume?: number;
  fadeTime?: number;
};

const DEFAULT_VOLUME = 0.15;
const DEFAULT_FADE_TIME = 1000;

export const BackgroundMusic = ({ file, volume, fadeTime }: Props) => {
  const [play, { stop, sound }] = useSound(file, { loop: true });

  const { session } = useXR();

  const vol = volume !== undefined ? volume : DEFAULT_VOLUME;
  const fade = fadeTime !== undefined ? fadeTime : DEFAULT_FADE_TIME;

  useEffect(() => {
    // Don't play music when not in VR
    if (!session) {
      return;
    }

    const startSound = () => {
      if (!sound) return;
      sound.fade(0, vol, fade);
      play();
    };

    const endSound = () => {
      if (!sound) return;
      sound.fade(vol, 0, fade);
      setTimeout(() => stop(), fade);
    };

    startSound();

    return () => {
      endSound();
    };
  }, [play, stop, sound, vol, session]);

  return null;
};

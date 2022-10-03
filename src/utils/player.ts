import { Group } from 'three';

export const resetPlayer = (player: Group) => {
  player.position.x = 0;
  player.position.y = 0;
  player.position.z = 0;

  player.rotation.x = 0;
  player.rotation.y = 0;
  player.rotation.z = 0;
};

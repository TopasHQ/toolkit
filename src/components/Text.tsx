import { Text as TextDrei } from '@react-three/drei';
import { ReactElement } from 'react';

import fontBlack from '../assets/typography/Roboto-Black.ttf';
import fontBold from '../assets/typography/Roboto-Bold.ttf';
import fontRegular from '../assets/typography/Roboto-Regular.ttf';
import fontThin from '../assets/typography/Roboto-Thin.ttf';

type Props = React.ComponentProps<typeof TextDrei> & {
  black?: boolean;
  thin?: boolean;
  bold?: boolean;
};

export const Text = (props: Props): ReactElement => {
  const getFont = () => {
    if (props.black) {
      return fontBlack;
    }

    if (props.bold) {
      return fontBold;
    }

    if (props.thin) {
      return fontThin;
    }

    return fontRegular;
  };

  return (
    <TextDrei font={getFont()} {...props}>
      {props.children}
    </TextDrei>
  );
};

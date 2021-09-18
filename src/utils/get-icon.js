// @flow strict
import { ICONS } from '../constants';

const getIcon = (name: string) => {
  let icon;

  switch (name) {
    case 'email':
      icon = ICONS.EMAIL;
      break;

    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;

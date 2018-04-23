import { CHANGE_THEME } from '../constants/action_types';

export const changeTheme = color => ({
  type: CHANGE_THEME,
  color,
});

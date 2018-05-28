import { TOGGLE_MENU } from '../constants/action_types';

// When menu icon is clicked we dispatch this to toggle the menu
export const toggleMenu = (open = true, element) => ({
  type: TOGGLE_MENU,
  open: !open,
  element,
});

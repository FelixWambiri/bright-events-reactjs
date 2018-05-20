import { TOGGLE_SEARCH } from '../constants/action_types';

export const toggleSearch = (open = false) => ({
  type: TOGGLE_SEARCH,
  open: !open
});

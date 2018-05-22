import {TOGGLE_PASSWORD_FIELD} from '../constants/action_types';

export const togglePasswordInput = (open = true) => ({
    type: TOGGLE_PASSWORD_FIELD,
    open: !open
});

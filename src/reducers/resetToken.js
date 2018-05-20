import { TOKEN_VERIFIED } from '../constants/action_types';

export default (token = '', action) => {
  switch (action.type) {
    case TOKEN_VERIFIED:
      return action.resetToken;
    default:
      return token;
  }
};

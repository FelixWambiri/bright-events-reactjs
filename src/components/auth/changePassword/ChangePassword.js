import ChangePasswordForm from './ChangePasswordForm';
import { connect } from 'react-redux';
import { changePassword, verifyToken } from '../../../actions/passwordReset.actions';
import resetError from '../../../reducers/resetTokenError';

const mapStateToProps = state => ({
  resetError: state.resetError,
    resetToken:state.resetToken
});

const mapDispatchToProps = dispatch => ({
  verifyResetToken: token => dispatch(verifyToken(token)),
  changePassword: (data, token) => dispatch(changePassword(data, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);

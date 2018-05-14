import ResetPasswordForm from './ResetPasswordForm';
import { connect } from 'react-redux';
import { sendEmail } from '../../../actions/passwordReset.actions';


const mapStateToProps = state => ({ error: state.error });
const mapDispatchToProps = dispatch => ({ sendMail: email => dispatch(sendEmail(email)) });

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);

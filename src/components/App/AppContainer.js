import { connect } from 'react-redux';
import {clearError} from "../../actions/api.actions";
import App from "../../App";

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});


export default connect(mapStateToProps, { clearError })(App);

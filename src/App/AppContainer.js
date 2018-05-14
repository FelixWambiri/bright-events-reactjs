import { connect } from 'react-redux';
import App from "./App";

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});
const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps)(App);

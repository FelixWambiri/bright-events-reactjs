import RsvpList from './RsvpList';
import { connect } from 'react-redux';
import { myRsvps } from '../../actions/events';

const mapStateToProps = state => ({
  myRsvps:state.myRsvps
});

const mapDispatchToProps = dispatch => ({
  fetchMyRsvps: () => dispatch(myRsvps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RsvpList);

import {searchEvents, searchLocal} from '../../actions/searching.actions';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';

const mapStateToProps = state => ({
  searchResults: state.searchResults.events,
  searchLoading: state.searchLoading,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  // searchEvent: (query,type) => dispatch(searchEvents(query,type)),
  searchEvent: (query) => dispatch(searchLocal(query)),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

import { searchEvents, searchLocal } from '../../actions/searching.actions';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import {clearError} from "../../actions/api.actions";

const mapStateToProps = state => ({
  searchResults: state.searchResults.events,
  searchLoading: state.searchLoading,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  searchEvent: query => dispatch(searchEvents(query)),
  // searchEvent: query => dispatch(searchLocal(query)),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

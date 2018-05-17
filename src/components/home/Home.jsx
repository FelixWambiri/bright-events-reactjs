import React from 'react';
import EventsList from '../events/event-list/EventsList';
import { Button, CircularProgress, Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import '../../assets/css/bootstrap-grid.css';
import { Link } from 'react-router-dom';
import AuthService from '../../helpers/AuthService';
import SearchBar from '../nav/SearchBar';
import Search from '../nav/Search';
import Warning from '../Warning';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.props.fetchEvents();
  }


  render() {
    const {
      events, loading, error, searchNotFound,
    } = this.props;
    return (
      <div className="" style={{ marginTop: 12, marginLeft: 0 }}>
        <Search />
        {
              searchNotFound &&
              <Warning message={searchNotFound} />
          }
        {
                    (events.length > 0 ? <EventsList events={events} /> :
                    <div className="ui warning floating message">
                      <div><h4>No Events Here Yet, Please check back later </h4>  <span hidden={!this.auth.loggedIn()}>Create one <Link to="/events/new"><b>New Event</b></Link></span></div>

                    </div>
                    )
                }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.loading,
  error: state.error,
  searchNotFound: state.searchNotFound,
});
const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

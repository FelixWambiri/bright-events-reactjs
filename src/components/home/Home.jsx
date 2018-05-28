import React from 'react';
import EventsList from '../events/event-list/EventsList';
import { CircularProgress, Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { Button, Reveal } from 'semantic-ui-react';
import { fetchEvents } from '../../actions/events';
import '../../assets/css/bootstrap-grid.css';
import { Link } from 'react-router-dom';
import AuthService from '../../helpers/AuthService';
import Search from '../nav/Search';
import Warning from '../Warning';
import styles from '../../assets/css/styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.auth = new AuthService();
    this.state = {
      page: 1,
      items: 4,
      loading: false,
    };
  }

  componentDidMount() {
    const { items, page } = this.state;
    this.props.fetchEvents(page, items);
  }

  loadMore() {
    this.setState({
      page: this.state.page + 1,
      items: this.state.items,
    }, () => {
      const { page, items } = this.state;
      this.props.fetchEvents(page, items, true);
    });
  }


  render() {
    console.log("the propsa re'", this.props);
    const {
      events, loading, error, searchNotFound, theme, hasNext,
    } = this.props;
    return (
      <div ref="scroller" style={{ marginTop: 12, marginLeft: 0, height: 110 }} >
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

        <Button style={theme.button} className={`${hasNext ? '' : 'hidden'}`} attached="bottom" onClick={this.loadMore}>Load More Events</Button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.loading,
  theme: state.theme.style,
  error: state.error,
  hasNext: state.paginator.hasNext,
  searchNotFound: state.searchNotFound,
});
const mapDispatchToProps = dispatch => ({
  fetchEvents: (page, items, loadMore = false) => dispatch(fetchEvents(page, items, loadMore)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

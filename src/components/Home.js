import React from "react";
import EventsList from "./events/event-list/EventsList";
import {Button, CircularProgress, Grid, Icon, IconButton, Snackbar} from "material-ui";
import {connect} from "react-redux";
import {fetchEvents} from "../actions/events";
import "./../assets/css/bootstrap-grid.css"

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchEvents()
    }

    render() {
        const {events, loading, error} = this.props;
        if (loading) {
            return (
                <div className="col-4 offset-4">
                    <CircularProgress/>
                </div>

            )
        }
        if (error.length !== 0) {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={true}
                    autoHideDuration={6000}
                    message={ <span>{error}</span>}
                    action={[
                        <Button key="retry" color="secondary" size="small" onClick={() => this.props.fetchEvents()}>
                            Retry
                        </Button>
                    ]}
                />
            )
        }
        return (
            <div className="" style={{marginTop: 12, marginLeft: 0}}>
                <EventsList events={events} isLoading={""}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events,
        loading: state.loading,
        error: state.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchEvents: () => dispatch(fetchEvents())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)
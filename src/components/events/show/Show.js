import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchSingleEvent, rsvp} from "../../../actions/events";
import moment from "moment"
import {
    Avatar, Button,
    Card, CardContent, CardHeader, CircularProgress, Divider, Grid, Snackbar
} from "material-ui";
import {Link} from "react-router-dom";
import MapComponent from "../../map/MapComponent";
import Warning from "../../Warning";
import AuthService from "../../../helpers/AuthService";
import EventGuests from "../../guests/EventGuests";

class Show extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService()
    }

    componentDidMount() {
        this.props.fetchSingleEvent();
    }


    componentDidCatch(error,errorInfo){
        console.log("we've got this error",error)
        console.log("this is what we kno w about an error ", errorInfo)
    }

    render() {
        const {event,theme,guests,coordinates,loading,error,rsvp,rsvp_loading} = this.props;
        if (loading){
            return (
                <div className="col-4 offset-4">
                    <CircularProgress/>
                </div>
            )
        }
        return (
            <Grid className="ui fluid"  >
                {
                    (error.length !== 0 )?  <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={(error.length !== 0)}
                        autoHideDuration={6000}
                        message={ <span>{error}</span>}
                        action={[
                            <Button component={Link} to="/" key="retry" color="secondary" size="small">
                                Home
                            </Button>
                        ]}
                    />:''
                }

                    <div style={theme.card} >
                        <Grid >
                            <Card className="">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className="" color="primary">
                                            S
                                        </Avatar>
                                    }
                                    title={event.name}
                                    subheader={`${ moment(event.start_date).fromNow()}`}
                                />
                                <Divider/>
                                <CardContent>
                                    <div className="row">
                                        <div className="col-4">
                                           <h3>{event.name}</h3>
                                            <p>
                                                {event.description}
                                            </p>
                                            <div>
                                                <h5>Organiser: {}</h5>
                                                <h5>Price: {event.price} Ksh</h5>
                                            </div>
                                            <div className="ui success message transition hidden">
                                                <i className="close icon"/>
                                                <div className="header">
                                                    Your user registration was successful.
                                                </div>
                                                <p>You may now log-in with the username you have chosen</p>
                                            </div>
                                            <div className="ui buttons">
                                                <a className="ui facebook button" href="#">
                                                    <i className="facebook icon"/>
                                                    Share
                                                </a>
                                                <div className="or"/>
                                                {
                                                    (this.auth.loggedIn())?
                                                        <button className={`ui ${rsvp_loading?'loading':''}  positive  button`} onClick={()=>rsvp(event.id)}>RSVP</button>:
                                                        <button className="ui positive button" onClick={()=>this.props.history.push('/login')}>Login To RSVP</button>
                                                }
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            {
                                                (this.auth.loggedIn() && event.user_id === this.auth.currentUserId()) &&
                                                <EventGuests guests={guests} />
                                            }



                                        </div>
                                        <div className="col-8">

                                            {
                                                loading &&
                                                (typeof coordinates === 'string')?<Warning message={coordinates}/>:
                                                    <MapComponent  coordinates={coordinates} {...event} loading={loading}/>
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                </Grid>


        );
    }
}
Show.defaultProps = {
    zoom: 11,
    event:{}
};
Show.propTypes = {
    event:PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch,ownProps) =>{
   return {
            fetchSingleEvent:()=>dispatch(fetchSingleEvent(ownProps.match.params.id)),
            rsvp:(event)=>dispatch(rsvp(event))
   }
};

const mapStateToProps = (state) =>{
    return {
        event:state.showEvent,
        coordinates:state.map.coordinates,
        loading:state.loading,
        error:state.error,
        theme:state.theme,
        guests:state.guests,
        rsvp_loading:state.rsvp_loading
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show);

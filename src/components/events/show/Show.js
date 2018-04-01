import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchSingleEvent, rsvp} from "../../../actions/events";
import moment from "moment"
import {
    Avatar, Button,
    Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Grid, Snackbar
} from "material-ui";
import {Link} from "react-router-dom";
import MapComponent from "../../MapComponent";
import Warning from "../../Warning";
import AuthService from "../../../helpers/AuthService";



class Show extends Component {

    componentDidMount() {
        this.props.fetchSingleEvent()
    }

    constructor(props) {
        super(props);
        this.auth = new AuthService()
    }


    render() {
        const {event,coordinates,loading,error,rsvp,rsvp_loading} = this.props;
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

                <Grid>
                    <div style={{margin:10}} >
                        <Grid >
                            <Card className="">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className="">
                                            S
                                        </Avatar>
                                    }
                                    style={{backgroundColor:"#b7b3b9",color:"white"}}
                                    title={event.name}
                                    subheader={`${ moment(event.start_date).fromNow()}`}
                                />
                                <Divider/>
                                <CardContent>
                                    <div className="row">
                                        <div className="col-4">
                                           <h3>{event.name}</h3>
                                            <hr/>
                                            <p>
                                                {event.description}
                                            </p>
                                            <p>
                                                <h5>Organiser: {}</h5>
                                                <h5>Price: {event.price} Ksh</h5>
                                            </p>
                                            <div className="ui success message transition hidden">
                                                <i className="close icon"/>
                                                <div className="header">
                                                    Your user registration was successful.
                                                </div>
                                                <p>You may now log-in with the username you have chosen</p>
                                            </div>
                                            <div className="ui buttons">
                                                <button className="ui button">Share</button>
                                                <div className="or"/>
                                                {
                                                    (this.auth.loggedIn())?
                                                        <button className={`ui ${rsvp_loading?'loading':''}  positive  button`} onClick={()=>rsvp(event.id)}>RSVP</button>:
                                                        <button className="ui positive button" onClick={()=>this.props.history.push('/login')}>Login To RSVP</button>
                                                }
                                            </div>


                                        </div>
                                        <div className="col-8">
                                            {
                                                (typeof coordinates === 'string')?<Warning message={coordinates}/>:
                                                    <MapComponent  coordinates={coordinates} {...event} loading={loading}/>
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Link  to='#/' size="small" color="info">
                                        Learn More
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </div>
                </Grid>

            </Grid>

        );
    }
}
Show.defaultProps = {
    zoom: 11
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
        rsvp_loading:state.rsvp_loading
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show);

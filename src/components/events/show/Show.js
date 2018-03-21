import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchSingleEvent} from "../../../actions/events";
import MoreVertIcon from "material-ui-icons/MoreVert"
import moment from "moment"
import {
    Avatar, Button,
    Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton,
    Typography, withStyles
} from "material-ui";
import {Link} from "react-router-dom";
import Gravatar from "react-gravatar"


const styles = {
    card: {
        maxWidth: 300,
        marginLeft:20,
        maxHeight:300,
        borderRadius:3
    },
    media: {
        height: 50,
        backgroundColor:"#E64A19"
    },
};
class Show extends Component {

    componentDidMount() {
    }
    setMapElementReference(elementRef){
        this.mapElement = elementRef
    }

    render() {
        const {event} = this.props;
        return (
            <Grid container  >
                <Grid item md={12} >
                    <div style={{margin:10}} >
                        <Grid xs={12} md={12}>
                            <Card className="">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className="">
                                            R
                                        </Avatar>
                                    }
                                    style={{backgroundColor:"#ff4081",color:"white"}}
                                    action={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={event.name}
                                    subheader={`Happening ${ moment(event.start_date).fromNow()}`}
                                />
                                <Divider/>
                                <CardContent>

                                    <Typography component="p">
                                        {event.description}
                                    </Typography>

                                    {/*<div className="map" ref={this.setMapElementReference}/>*/}

                                </CardContent>
                                <CardActions>
                                    <Link  to={`events/show/$3`} size="small" color="primary">
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

Show.propTypes = {
    event:PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch,ownProps) =>dispatch(fetchSingleEvent(ownProps.match.params.id));

const mapStateToProps = (state) =>{
    return {
        event:state.showEvent
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Show);

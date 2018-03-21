import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchSingleEvent} from "../../../actions/events";
import MoreVertIcon from "material-ui-icons/MoreVert"
import moment from "moment"
import {
    Avatar,
    Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton,
    Typography,
} from "material-ui";
import {Link} from "react-router-dom";

class Show extends Component {

    componentDidMount() {
        this.props.fetchSingleEvent()
    }

    render() {
        const {event} = this.props;
        return (
            <Grid className="ui fluid"  >
                <Grid>
                    <div style={{margin:10}} >
                        <Grid >
                            <Card className="">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className="">
                                            R
                                        </Avatar>
                                    }
                                    style={{backgroundColor:"#b7b3b9",color:"white"}}
                                    // action={
                                    //     <IconButton>
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title={event.name}
                                    subheader={`Happening ${ moment(event.start_date).fromNow()}`}
                                />
                                <Divider/>
                                <CardContent>

                                    <Typography component="p">
                                        {event.description}
                                    </Typography>


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

Show.propTypes = {
    event:PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch,ownProps) =>({
    fetchSingleEvent:()=>dispatch(fetchSingleEvent(ownProps.match.params.id))
})

const mapStateToProps = (state) =>{
    return {
        event:state.showEvent
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Show);

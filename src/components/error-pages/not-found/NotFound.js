import React, {Component} from 'react';
import lost from "../../../assets/img/404-1.jpg"
import {
    Button, Card, CardActions, CardContent, CardMedia, Divider, Typography,
    withStyles
} from "material-ui";
import Home from "material-ui-icons/Home"
import styles from "./styles"
import {Link} from "react-router-dom";
class NotFound extends Component {
    render() {
        const {location,classes } = this.props;
        return (
            <div className="col-6 offset-3">
                <Card className={classes.mgt}>
                    <CardMedia
                        style={{height:300}}
                        className=""
                        image={lost}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Dude, You seem to be lost. <br/>
                            We couldn't find location {location.pathname}
                        </Typography>
                    </CardContent>
                    <Divider/>
                        <div className="col-4 offset-4">
                            <CardActions>
                            <Button component={Link} to="/" size="small" color="primary">
                                <Home/>  Go Home
                            </Button>
                            </CardActions>
                        </div>


                </Card>
            </div>

        );
    }
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default withStyles(styles)(NotFound);

import {
    Button,
    Card, CardActions, CardContent, Divider, Grid,
    Typography, withStyles
} from "material-ui";
import React from "react";
import {Link} from "react-router-dom";


const styles = {
    card: {
        maxWidth: 400,
        marginLeft:20,
        maxHeight:300,
        borderRadius:7
    },
    media: {
        height: 100,
        backgroundColor:"#E64A19"
    },
};
const Event = (props) =>{
    const {classes,name,description,id} = props;
    return (
        <Grid item>
            <Card className={classes.card}>
                <div
                    className={classes.media}
                    title="Bright Event"
               />
                <CardContent>
                    <Typography variant="title" component="h2">
                        {name.toUpperCase()}
                    </Typography>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
                <Divider light />
                <CardActions>
                    <Button component={Link} variant="flat"  to={`events/show/${id}`} size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    )
}
export default withStyles(styles)(Event)
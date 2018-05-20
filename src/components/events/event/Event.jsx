import {
  Button,
  Card, CardActions, CardContent, Divider, Grid,
} from 'material-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../constants/urls';
import event from '../../../assets/img/bright.png';
import Description from './DescriptionComponet';


const Event = (props) => {
  const {
    theme, name, description, id, image,
  } = props;

  const defaultImage = (e) => {
    e.target.src = event;
  };

  const mediaURL = image ? `${IMAGE_BASE_URL}${image}` : event;
  return (
    <Grid item md={4} lg={3} sm={1} xs={12}>
      <Card style={theme.card} raised>
        <img alt={name} src={mediaURL} onError={defaultImage} style={theme.media} />
        <CardContent>
          <h5> {name.toUpperCase()}</h5>
          <Description description={description} theme={theme.description} />
        </CardContent>
        <Divider light />
        <CardActions>
          <Button component={Link} variant="flat" to={`events/show/${id}`} size="small" style={theme.button}>
                        Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>

  );
};
const mapStateToProps = state => ({
  theme: state.theme.style,
});
export default connect(mapStateToProps)(Event);

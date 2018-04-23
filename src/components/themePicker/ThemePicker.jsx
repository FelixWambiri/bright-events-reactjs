import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import ThemePickerService from '../../helpers/ThemePickerService';
import { ANDROID_GREEN, BYZANTINE, LIGHT_SEA_GREEN } from '../../constants/themes.constant';
import { androidGreen, byzantine, lightSeaGreen } from '../../helpers/themes.styles';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  nav: {
    backgroundColor: '#FF1654',
  },

});


class ThemePicker extends React.Component {
  constructor(props) {
    super(props);
    this.changeTheme = this.changeTheme.bind(this);
    this.themeService = new ThemePickerService();
  }

  changeTheme(color) {
    this.props.onChangeTheme(color);
    this.themeService.setTheme(color);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        <Chip label="ANDROID GREEN" onClick={() => this.changeTheme(ANDROID_GREEN)} style={androidGreen.button} />
        <Chip label="LIGHT SEA GREEN" onClick={() => this.changeTheme(LIGHT_SEA_GREEN)} style={lightSeaGreen.button} />
        <Chip label="BYZANTINE" onClick={() => this.changeTheme(BYZANTINE)} style={byzantine.button} />
      </div>
    );
  }
}


ThemePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ThemePicker);

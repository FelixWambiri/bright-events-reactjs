

import {ANDROID_GREEN, BYZANTINE, DEFAULT_THEME, LIGHT_SEA_GREEN} from "../constants/themes.constant";
import styles from "../components/nav/styles";
import {CHANGE_THEME} from "../constants/action_types";
import ThemePickerService from "../helpers/ThemePickerService";
import {androidGreen, byzantine, defaultColor, lightSeaGreen} from "../helpers/themes.styles";

const themeService = new ThemePickerService();

export default (currentTheme={...styles,style:defaultColor},action) =>{
    switch (action.type){
        case CHANGE_THEME:
            return changeColor(action.color);
        default:
            return currentTheme
    }
}


const changeColor =  (color)=>{
    const styles = {
        mb: {
            marginBottom: 20
        },
        root: {
            flexGrow: 1,
        },
        flex: {
            flex: 1
        },
        title: {
            color: 'white',
            flex: 1
        },
        dashboard: {
            marginRight: -10,
            marginLeft: 10
        }
    };
    switch (color){
        case LIGHT_SEA_GREEN:
            themeService.setTheme(LIGHT_SEA_GREEN);
            return {...styles,style:lightSeaGreen};
        case BYZANTINE:
            themeService.setTheme(BYZANTINE);
            return {...styles,style:byzantine};
        case ANDROID_GREEN:
            themeService.setTheme(ANDROID_GREEN);
            return {...styles,style:androidGreen};
        default:
            themeService.setTheme(DEFAULT_THEME);
            return {...styles,style:defaultColor};

    }
};
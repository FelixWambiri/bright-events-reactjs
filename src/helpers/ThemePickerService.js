export default class ThemePickerService{
    getCurrent(){
        return localStorage.getItem('theme');
    }
    setTheme(theme){
        this.removeTheme();
        localStorage.setItem('theme',theme)
    }
    removeTheme(){
        localStorage.removeItem('theme')
    }
}
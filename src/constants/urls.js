export const BASE_URL = 'https://bright-event.herokuapp.com/api/v1';
// export const BASE_URL = process.env.BASE_URL;

export const loginURL = `${BASE_URL}/auth/login`;
export const eventsURL = `${BASE_URL}/events/`;
export const categoriesURL = `${BASE_URL}/events/categories`;
export const IMAGE_BASE_URL = "http://localhost:5000/";
export const RESET_URL = BASE_URL+"/auth/reset"
export const VERIFY_URL = BASE_URL+"/auth/reset-password/verify/"
export const CHANGE_URL = BASE_URL+"/auth/reset-password"

// export const IMAGE_BASE_URL = 'https://bright-event.herokuapp.com/';

export const registerURL = `${BASE_URL}/auth/register`;

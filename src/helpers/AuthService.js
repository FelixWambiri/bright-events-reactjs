import decode from "jwt-decode"
export default class AuthService{
     loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    logout() {
        localStorage.removeItem('token');
    }


     getToken(){
        return localStorage.getItem("token")
    }

     isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

}
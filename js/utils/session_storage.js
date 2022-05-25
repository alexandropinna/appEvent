class Auth {
    constructor() {
        this.auth = sessionStorage.getItem("auth") ?? sessionStorage.setItem("auth", JSON.stringify(authStructure));
        this.auth = JSON.parse(sessionStorage.getItem("auth"));
        // this.user = document.querySelector("#username").value;
        // this.pass = document.querySelector("#password").value;

        // this.validateAuth()
    }
    
    validateAuth() {
        let auth = this.auth;
        let logged = false; 
        this.user = document.querySelector("#username").value;
        this.pass = document.querySelector("#password").value;
        auth.find(u => {
            if (u.user == this.user && u.pass == this.pass) {
                u.logged = true
                sessionStorage.setItem("auth", JSON.stringify(auth))
                this.auth = JSON.parse(sessionStorage.getItem("auth"))
                logged = true;
            }
        })
        return logged;
    }

    logOut() {
        let auth = this.auth
        auth.find(u => {
            if (u.logged == true) {
                u.logged = false
                sessionStorage.setItem("auth", JSON.stringify(auth))
                this.auth = JSON.parse(sessionStorage.getItem("auth"))
            }
        })
        window.location.replace("./index.html");
    }

    getLoggedUser() {
        let auth = this.auth;
        let user = false;

        auth.find(u => {
            if (u.logged == true) {
                user = u;
            }
        })
        return user;
    }
    getLoggedRoleUser() {
        let auth = this.auth;
        let role = false;

        auth.find(u => {
            if (u.logged == true) {
                role = u.role;
            }
        })
        return role;
    }
}
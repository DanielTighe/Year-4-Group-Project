// required for authentication header use
axios.defaults.withCredentials = true;
// tries to send authentication header with every request

let auth0 = null;
let isAuthenticated = false;

const configureClient = async () => {
    auth0 = await createAuth0Client({
        "domain": "exetercivil.eu.auth0.com",
        "client_id": "KpZx7y5CcCi0fXwsR3V3EIOOGKdyAvKP",
        "cacheLocation": "localstorage",
        "audience": "shm"
    });
};

window.onload = async () => {
    await configureClient();
    isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        return
    }
    // Redirect to / if not logged in
    window.location.replace('/')
};

const add_user = async () => {
    isAuthenticated = await auth0.isAuthenticated();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const role = document.getElementById("role").value

    if(isAuthenticated){
        const token =  await auth0.getTokenSilently()
        axios.post("http://localhost:3030/users", {
            name: name,
            email: email,
            password: password,
            role: role
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            console.log("User added")
        })
    }
}
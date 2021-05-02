import axios from "axios";


// Definition of the expected flow types according to the request types
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

// Definition of the base URL. Convenient, because the ports can change!
const baseUrl = "http://127.0.0.1:8000/";

axios.defaults.baseURL = baseUrl;


// Adds the authentication token to each Axios request if it is valid
axios.interceptors.request.use(
    (config) => {
        const tokenTmp =  String(localStorage.getItem("token") || -1)
        if ( tokenTmp !== "-1"  && config.url !== "authentication_token"   ) {
            //Le token existe on l'envoie !
            config.headers["Authorization"] = 'Bearer ' + tokenTmp ;
        }
        else
        {
            // The token does not exist or we are trying to connect
            delete(config.headers["Authorization"])
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// If we intercept a response that tells us that the token is expired, we use the refresh token to obtain a new token
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        //Explications here : https://stackoverflow.com/questions/64576410/react-axios-interceptor-for-refresh-token

        const originalRequest = error.config;
        console.log(error.config)
        // Prevent infinite loops
        if (error.response.status === 401 && error.config.url === '/authentication_token/refresh') {
            console.log("antiboucle")
            window.location.href = '/login/';
            return Promise.reject(error);
        }


        if (error.response.data.message === "Expired JWT Token" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
        {

            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken){

                return axios
                    .post('/authentication_token/refresh', {refresh: refreshToken})
                    .then((response) => {

                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);

                        axios.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                        return axios(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }else{
                console.log("Refresh token not available.")
                window.location.href = '/login/';
            }
        }
        else
        {
            console.log(error.response.data)
        }
        // Specific error handling done elsewhere
        return Promise.reject(error);
    }
);


export default axios
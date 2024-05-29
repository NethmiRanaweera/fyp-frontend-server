import axios from "axios";

const instance = axios.create({
    baseURL: 'https://20afb449-8469-47d6-a64b-8c63c9fc62e7-prod.e1-us-cdp-2.choreoapis.dev/fypbackend/backendserver/water-treatment-plant-a4d/v1.0',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
})
const user = localStorage.getItem("token");
instance.defaults.headers.common['Authorization'] = "Bearer "+ user;

export default instance;
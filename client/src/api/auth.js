import axios from "./axios";

const registerRequest = user => axios.post('/register', user)

const loginRequest = user => axios.post('/login', user)

const verifyTokenRequest = () => axios.get('/verify')

export { registerRequest, loginRequest, verifyTokenRequest }
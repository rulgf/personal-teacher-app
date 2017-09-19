import { applyMiddleware } from 'redux';
import  loginService  from './loginService'

const Services = applyMiddleware(loginService);

export default Services;

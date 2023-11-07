
import axios from 'axios';
import { SERVIDOR } from './Config';

const http = axios.create({
    baseURL:SERVIDOR,
    headers:{
        'Content-type':'application/json',
    }
})


export default http;
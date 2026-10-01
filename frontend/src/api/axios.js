import axios from 'axios';
import {auth} from '../firebase';
const api=axios.create({baseURL:process.env.REACT_APP_API_URL||'/api',timeout:15000});
api.interceptors.request.use(async c=>{const user=auth.currentUser;if(user)c.headers.Authorization=`Bearer ${await user.getIdToken()}`;return c});
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401&&window.location.pathname!=='/'){if(window.location.pathname!=='/register')window.location.assign('/');}return Promise.reject(e)});
export const messageOf=e=>e.response?.data?.message||e.code?.replace('auth/','').replaceAll('-',' ')||e.message||'Something went wrong';export default api;

import axios ,{ AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import {Activity} from '../models/activity';
import { Festivali } from "../models/festivali";
import { Kengetari } from "../models/kengetari";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";


const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config;
})

axios.interceptors.response.use(async response => {
       await sleep(1000);
        return response;
},(error: AxiosError) => {
    const {data,status,config} = error.response!;
    switch(status){
        case 400:
          if(typeof data === 'string'){
            toast.error(data);
          }
          if(config.method === 'get' && data.errors.hasOwnProperty('id')){
               history.push('/not-found');
          } 
          if(data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
              if(data.errors[key]){
                   modalStateErrors.push(data.errors[key])
                }
              }            
             throw modalStateErrors.flat();
          } 
          break;
        case 401:
          toast.error('unauthorised');
          break;
        case 404:
          history.push('/not-found');
         break;
        case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error'); 
         break;
}
return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string, body:{}) => axios.put <T>(url,body).then(responseBody),
    delete: <T> (url:string) => axios.delete <T>(url).then(responseBody),

}
const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id:string) => requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity) => axios.post ('/activities',activity),
    update: (activity: Activity) => axios.put( `/activities/${activity.id}`,activity),
    delete: (id:string ) => axios.delete(`/activities/${id}`)
}
const Festivales = {
  list: () => requests.get<Festivali[]>('/festivali'),
  details: (id:string) => requests.get<Festivali>(`/festivali/${id}`),
  create:(festivali:Festivali) => axios.post ('/festivali',festivali),
  update: (festivali: Festivali) => axios.put( `/festivali/${festivali.id}`,festivali),
  delete: (id:string ) => axios.delete(`/festivali/${id}`)
}

const Kengetaries = {
  list: () => requests.get<Kengetari[]>('/kengetari'),
  details: (id:string) => requests.get<Festivali>(`/kengetari/${id}`),
  create:(kengetari:Kengetari) => axios.post ('/kengetari',kengetari),
  update: (kengetari: Kengetari) => axios.put( `/kengetari/${kengetari.id}`,kengetari),
  delete: (id:string ) => axios.delete(`/kengetari/${id}`)
}


const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}
const agent = {
    Activities,
    Account,
    Festivales,
    Kengetaries
}

export default agent; 
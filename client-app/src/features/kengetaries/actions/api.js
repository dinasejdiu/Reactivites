import axios from "axios";
import { ACTION_TYPES } from "./dCandidate";

const baseUrl = "http://localhost:5000/api/kengetari"


export default {

    dCandidate(url=baseUrl + 'dcandidate'){
        return{
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url+id),
            create : newRecord => axios.post(url,newRecord),
            update: (id,updateRecord) => axios.put(url + id , updateRecord),
            delete: id => axios.delete(url+id)
        }
    }
}
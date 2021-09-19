import axios from "axios";

const baseUrl = process.env.REACT_APP_APIR;


export default {

    dRindjek(url = baseUrl ) {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}
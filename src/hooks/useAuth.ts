import axios from "axios";
import { AUTH_URL, TOKEN_KEY } from "../components/data/backend";
import { ICompany, ILogin } from "../types";

export default function useAuth() {
    
    return {register , update , changePassword, login , getCurrentUser,getStat}

    function register(data : ICompany) {
        return axios.post(`${AUTH_URL}/register`,data)
    }

    function login(data : ILogin) {
        return axios.post(`${AUTH_URL}/login`,data)
    }

    function changePassword( id : string , data : {newPassword  :string , password :string}) {
        return axios.post(`${AUTH_URL}/change-password/${id}`,data)
    }

    function update(id : string ,data : ICompany) {
        return axios.post(`${AUTH_URL}/update/${id}`,data)
    }

    async function getCurrentUser() {
        const token = localStorage.getItem(TOKEN_KEY)
        if(!token){return null}
        const res = await axios.get(`${AUTH_URL}/verify/${token}`)
        const user = await axios.get(`${AUTH_URL}/${res.data._id}`)
        return user.data
    }
    function getStat(id : string) {
        return axios.get(`${AUTH_URL}/stat/${id}`)
    }
}
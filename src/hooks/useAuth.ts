import axios from "axios";
import { AUTH_URL, TOKEN_KEY } from "../components/data/backend";
import { ICompany, ILogin } from "../types";

export default function useAuth() {
    
    return {register , login , getCurrentUser}

    function register(data : ICompany) {
        return axios.post(`${AUTH_URL}/register`,data)
    }

    function login(data : ILogin) {
        return axios.post(`${AUTH_URL}/login`,data)
    }

    async function getCurrentUser() {
        const token = localStorage.getItem(TOKEN_KEY)
        if(!token){return null}
        const res = await axios.get(`${AUTH_URL}/verify/${token}`)
        const user = await axios.get(`${AUTH_URL}/${res.data._id}`)
        return user.data
    }
}
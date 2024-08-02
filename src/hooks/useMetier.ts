import axios from "axios";
import { AUTH_URL, METIER_URL, TOKEN_KEY } from "../components/data/backend";
import { IMetier } from "../types";
import { useCurrentUser } from "./useCurrentUser";

export default function useMetier() {
    
    const { user} = useCurrentUser()
    return {create , update, deleteOne, getAll}

    function create(data : IMetier) {
        return axios.post(`${METIER_URL}/create/${user?._id}`,data)
    }

    function getAll() {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${METIER_URL}/company/${user?._id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function update (id : string , data : IMetier){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.put(`${METIER_URL}/${id}` , data , {
            headers : { Authorization: `Bearer ${token}` }
        })        
    }

    function deleteOne(id  :string){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.delete(`${METIER_URL}/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

}
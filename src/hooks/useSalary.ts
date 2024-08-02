import axios from 'axios'
import { SALARY_URL, TOKEN_KEY } from '../components/data/backend'
import { ISalary } from '../types'
import { useCurrentUser } from './useCurrentUser'

export default function useSalary(){

    const {user} = useCurrentUser()

    return { createSalary , getAll , getByEmployee , getById , getByWork }

    function createSalary(data : ISalary) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.post(`${SALARY_URL}`, data , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getAll(id:string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${SALARY_URL}/company/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }
    function getByEmployee(id : string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${SALARY_URL}/employee/${id}`, {
            headers : { Authorization: `Bearer ${token}` }
        })
    }
    function getByWork(id : string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${SALARY_URL}/work/${id}`, {
            headers : { Authorization: `Bearer ${token}` }
        })
    }
    function getById(id:string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${SALARY_URL}/${user?._id}`,{
            headers : { Authorization: `Bearer ${token}` }
        })
    }


}
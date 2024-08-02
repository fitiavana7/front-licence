import axios from 'axios';
import { EMPLOYEE_URL, TOKEN_KEY } from '../components/data/backend';
import { IEmployee } from '../types';
import { useCurrentUser } from './useCurrentUser';

export default function useEmployee(){
    const { user } = useCurrentUser()

    function createEmployee(data : IEmployee){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.post(`${EMPLOYEE_URL}/${user?._id}` , data , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getEmployees(id: string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${EMPLOYEE_URL}/company/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getEmployeeDetails(id: string){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${EMPLOYEE_URL}/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function editEmployee(employeeId : string , data : IEmployee) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.put(`${EMPLOYEE_URL}` ,data , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function deleteEmployee(employeeId:string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.delete(`${EMPLOYEE_URL}`,{
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    return { getAll : getEmployees, getEmployeeDetails, create : createEmployee , update : editEmployee , delete : deleteEmployee }
}
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

    function getCurrentEmployees(id: string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${EMPLOYEE_URL}/company/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getOldEmployees(id: string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${EMPLOYEE_URL}/company/leaved/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function moveEmployee( data : {id: string , leavingDate : Date}) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.post(`${EMPLOYEE_URL}/move` , data , {
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
        return axios.put(`${EMPLOYEE_URL}/update/${employeeId}` ,data , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function deleteEmployee(employeeId:string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.delete(`${EMPLOYEE_URL}/${employeeId}`,{
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    return { getAll : getCurrentEmployees, getOldEmployees, moveEmployee , getEmployeeDetails, create : createEmployee , update : editEmployee , deleteEmployee }
}
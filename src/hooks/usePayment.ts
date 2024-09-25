import axios from 'axios';
import { PAYMENT_URL, TOKEN_KEY } from '../components/data/backend';
import { IPayment } from '../types';
import { useCurrentUser } from './useCurrentUser';

export default function usePayment(){
    const { user } = useCurrentUser()

    function create(data : IPayment){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.post(`${PAYMENT_URL}` , data , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getPaymentsByEmployee(id: string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${PAYMENT_URL}/employee/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getPaymentsByCompany(id: string){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${PAYMENT_URL}/company/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getTotalAmountCompany(id: string){
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${PAYMENT_URL}/company-total/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function getPaymentsByWork(id : string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.get(`${PAYMENT_URL}/work/${id}` , {
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    function deletePayment(id:string) {
        const token = localStorage.getItem(TOKEN_KEY)
        return axios.delete(`${PAYMENT_URL}/${id}`,{
            headers : { Authorization: `Bearer ${token}` }
        })
    }

    return { create  , deletePayment, getTotalAmountCompany , getPaymentsByCompany , getPaymentsByEmployee , getPaymentsByWork}
}
import { message } from 'antd';
import { toast } from 'react-toastify';

export function showRequestError(msg? : string){
    toast.error(msg || 'Erreur lors de la requette...')
}

export function showSuccessMessage(msg? : string) {
    toast.success(msg || 'Requette reussie')
}

export function inputStyles(params?:string) {
    return `p-1 rounded-md outline-none focus:outline-blue-500 ${params}`
}

export function axiosInstance(url : string) {
    
}
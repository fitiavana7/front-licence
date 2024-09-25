import { message } from 'antd';
import { toast } from 'react-toastify';

export function showRequestError(msg? : string){
    toast.error(msg || 'Erreur lors de la requette...')
}

export function showWarningMessage(msg? : string){
    toast.warning(msg || 'Erreur lors de la requette...')
}

export function showSuccessMessage(msg? : string) {
    toast.success(msg || 'Requette reussie')
}

export function isValidHireDate(hireDate: Date): boolean {
    const today = new Date();
      return hireDate.getTime() < today.getTime()
  }

export function isValidDateRange(startDate: Date, endDate: Date): boolean {
    return startDate.getTime() < endDate.getTime()
}  
  

export function inputStyles(params?:string) {
    return `p-1 rounded-md outline-none focus:outline-blue-500 ${params}`
}

export function formatCurrency(amount : number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function isValidEmail(email : string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isOnlyDigits(str  :string) {
    const digitsRegex = /^\d+$/;
    return digitsRegex.test(str);
}
  
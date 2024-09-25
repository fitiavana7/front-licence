import React, { useEffect, useState } from 'react';
import StatItem from '../../../components/ui/StatItem';
import { formatCurrency, showRequestError } from '../../../helpers';
import useAuth from '../../../hooks/useAuth';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useEmployee from '../../../hooks/useEmployee';
import useMetier from '../../../hooks/useMetier';
import { IEmployee, IMetier } from '../../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiActivity, FiCheckSquare, FiUsers } from 'react-icons/fi';
import { FaCaretRight, FaEuroSign } from 'react-icons/fa';
import usePayment from '../../../hooks/usePayment';

type TStat =  { 
    totalEmployees : number,
    totalPayed : number,
    totalWorks : number,
    totalPayments : number
}
const NumberStat = () => {
    const {user} = useCurrentUser()
    const {getStat} = useAuth()
    const { getAll } = useEmployee()
    const { getAll : getMetier } = useMetier()
    const { getTotalAmountCompany } = usePayment()

    const [employees , setEmployees] = useState<IEmployee[]>()
    const [metiers , setMetiers] = useState<IMetier[]>()
    const [total , setTotal] = useState<number>(0)
    useEffect(()=>{
        refetch()
    },[])

    function refetch() {
        getAll(user?._id || '').then((res)=>{
            setEmployees(res.data)
        }).catch()        
        getMetier().then((res)=>{
            setMetiers(res.data)
        }).catch() 
        getTotalAmountCompany(user?._id || '').then((res)=>{
            setTotal(res.data)
        }).catch()       

    }

    const [stat , setStat]= useState<TStat>()
    useEffect(()=>{
        if(user?._id){
            getStat(user._id).then((e)=>{
                setStat(e.data)
            }).catch((err)=> showRequestError())
        }
    },[])
    return (
        <>
            <div className='flex justify-between items-center py-6 px-4 bg-primary rounded-lg text-white my-5'>
        	    <span className='font-bold text-3xl'>
                    {user?.name.toLocaleUpperCase()}
                </span>
                <span className='italic text-xl font-bold'>
                    {format(new Date(), 'dd MMMM yyyy', { locale: fr })}
                </span>
            </div>
            <div className='grid grid-cols-4 gap-2 text-black'>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-slate-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary items-end hover:text-white'> 
                        <FiUsers className='mr-2 text-3xl'/>
                        <span className='text-2xl'>{ employees?.length} salariés </span>
                    </h3>
                    <div className='text-start text-md mt-3'>
                        {
                            employees?.map(el =>(
                                <p className='flex items-center'><FaCaretRight className='mr-1'/> {el.firstName} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-slate-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary items-end hover:text-white'>
                        <FiActivity className='mr-2 text-3xl'/>
                        <span className='text-2xl'>{stat?.totalWorks} metiers </span>
                    </h3>
                    <div className='text-start text-md mt-3'>
                        {
                            metiers?.map(el =>(
                                <p className='flex items-center'><FaCaretRight className='mr-1'/> {el.title} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-slate-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary hover:text-white items-end'>
                        <FaEuroSign className='mr-2 text-3xl'/>    
                        <span className='text-2xl'>{stat?.totalPayments} paiements effectués </span> 
                    </h3>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-slate-400 hover:text-white py-16`}>
                    <h3 className='flex text-primary hover:text-white text-center items-center justify-center font-bold'>
                        <FiCheckSquare className='mr-2 text-3xl hover:text-white'/>
                        <span className='text-2xl'>{formatCurrency(total)} ar </span>
                    </h3>
                    <h1 className='text-center text-xl font-bold'>totals payés</h1>
                </div>
            </div>
        </>
    );
};

export default NumberStat;
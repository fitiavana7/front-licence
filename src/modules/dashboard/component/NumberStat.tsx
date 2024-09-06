import React, { useEffect, useState } from 'react';
import StatItem from '../../../components/ui/StatItem';
import { showRequestError } from '../../../helpers';
import useAuth from '../../../hooks/useAuth';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useEmployee from '../../../hooks/useEmployee';
import useMetier from '../../../hooks/useMetier';
import { IEmployee, IMetier } from '../../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiActivity, FiCheckSquare, FiUsers } from 'react-icons/fi';
import { FaEuroSign } from 'react-icons/fa';

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

    const [employees , setEmployees] = useState<IEmployee[]>()
    const [metiers , setMetiers] = useState<IMetier[]>()
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
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-blue-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary items-end hover:text-white'> 
                        <FiUsers className='mr-2 text-3xl'/>
                        <span className='text-2xl'>{ stat?.totalEmployees} salariés </span>
                    </h3>
                    <div className='text-start text-md mt-3'>
                        {
                            employees?.map(el =>(
                                <p>- {el.firstName} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-blue-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary items-end hover:text-white'>
                        <FiActivity className='mr-2 text-3xl'/>
                        <span className='text-2xl'>{stat?.totalWorks} metiers </span>
                    </h3>
                    <div className='text-start text-md mt-3'>
                        {
                            metiers?.map(el =>(
                                <p>- {el.title} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-blue-400 hover:text-white`}>
                    <h3 className='font-bold flex text-primary hover:text-white items-end'>
                        <FaEuroSign className='mr-2 text-3xl'/>    
                        <span className='text-2xl'>{stat?.totalPayments} paiements effectués </span> 
                    </h3>
                </div>
                <div className={`rounded-md p-3 text-center bg-[#F3F7EC] hover:bg-blue-400 hover:text-white`}>
                    <h3 className='flex text-primary hover:text-white items-end font-bold'>
                        <FiCheckSquare className='mr-2 text-3xl'/>
                        <span className='text-2xl'>{stat?.totalPayed} salariés payés </span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default NumberStat;
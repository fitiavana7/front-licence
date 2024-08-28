import React, { useEffect, useState } from 'react';
import StatItem from '../../../components/ui/StatItem';
import { showRequestError } from '../../../helpers';
import useAuth from '../../../hooks/useAuth';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useEmployee from '../../../hooks/useEmployee';
import useMetier from '../../../hooks/useMetier';
import { IEmployee, IMetier } from '../../../types';

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
            <div className='grid grid-cols-4 gap-2 text-black'>
                <div className={`rounded-md p-3 text-center bg-blue-200 hover:bg-blue-400 hover:text-white`}>
                    <h3 className='text-3xl font-bold'>{stat?.totalEmployees}</h3>
                    <h4 className='text-2xl'>salariés</h4>
                    <div className='text-start text-md'>
                        {
                            employees?.map(el =>(
                                <p>- {el.firstName} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-blue-200 hover:bg-blue-400 hover:text-white`}>
                    <h3 className='text-3xl font-bold'>{stat?.totalWorks}</h3>
                    <h4 className='text-2xl'>metiers</h4>
                    <div className='text-start text-md'>
                        {
                            metiers?.map(el =>(
                                <p>- {el.title} </p>
                            ))
                        }
                    </div>
                </div>
                <div className={`rounded-md p-3 text-center bg-blue-200 hover:bg-blue-400 hover:text-white`}>
                    <h3 className='text-3xl font-bold'>{stat?.totalPayments}</h3>
                    <h4 className='text-2xl'>paiements faits</h4>
                </div>
                <div className={`rounded-md p-3 text-center bg-blue-200 hover:bg-blue-400 hover:text-white`}>
                    <h3 className='text-3xl font-bold'>{stat?.totalPayed}</h3>
                    <h4 className='text-2xl'>salariés payés</h4>
                </div>
            </div>
        </>
    );
};

export default NumberStat;
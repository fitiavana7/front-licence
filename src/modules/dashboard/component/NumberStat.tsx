import React, { useEffect, useState } from 'react';
import StatItem from '../../../components/ui/StatItem';
import { showRequestError } from '../../../helpers';
import useAuth from '../../../hooks/useAuth';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

type TStat =  { 
    totalEmployees : number,
    totalPayed : number,
    totalWorks : number,
    totalPayments : number
}
const NumberStat = () => {
    const {user} = useCurrentUser()
    const {getStat} = useAuth()

    const [stat , setStat]= useState<TStat>()
    useEffect(()=>{
        if(user?._id){
            getStat(user._id).then((e)=>{
                setStat(e.data)
            }).catch((err)=> showRequestError())
        }
    },[])
    return (
        <div className='grid grid-cols-4 gap-2'>
            <StatItem color='green' data={{label : 'salariés' , value : stat?.totalEmployees || 0}}/>
            <StatItem color='blue' data={{label : 'metiers' , value : stat?.totalWorks || 0}}/>
            <StatItem color='red' data={{label : 'paiments faits' , value : stat?.totalPayments || 0}}/>
            <StatItem color='orange' data={{label : 'total payés' , value : stat?.totalPayed || 0}}/>
        </div>
    );
};

export default NumberStat;
import React, { FC, useEffect, useState } from 'react';
import { IMetier, ISalary } from '../../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaCalendarAlt, FaWallet } from 'react-icons/fa';
import useSalary from '../../../hooks/useSalary';
import { showRequestError } from '../../../helpers';
import useMetier from '../../../hooks/useMetier';
import { FiActivity, FiAlignJustify, FiCalendar, FiList, FiShoppingCart } from 'react-icons/fi';

type SalaryItemProps = {
    salary : ISalary,
    index : number
}
const SalaryItem : FC<SalaryItemProps> = ({salary , index}) => {
    const {getById} = useMetier()
    const [work , setWork] = useState<IMetier>()

    useEffect(()=>{
        getById(salary.workId).then((e)=>{
            setWork(e.data)
        }).catch((err)=>{showRequestError()})
    },[])

    return (
        <div className={`border text-sm ${index === 0 ? 'border-green-200 bg-green-100' : 'border-primary'} p-2 rounded-md`}>
            <div className='flex justify-end items-center my-2'>
                { index === 0 && <div className='py-1 px-3 mr-2 bg-green-400 rounded-full text-white'>active</div> }                                   
                <div className='py-1 px-3 bg-orange-500 rounded-full text-white'>{salary.amount} ar</div>
            </div>
            <div className='border border-primary p-2 my-2 rounded-md flex justify-between items-center'>
                <h3 className='flex items-center text-primary font-bold'><FiActivity className='mr-2' /> Métier :</h3>
                <span className='font-bold'>{work?.title}</span>
            </div>
                <div className='border border-primary p-2 my-2 rounded-md flex justify-between items-center'>
                    <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Date du changement :</h3>
                    <span className='font-bold'>{format(salary.applicationDate, 'dd MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className='border border-primary p-2 my-2 rounded-md'>
                    <h3 className='flex items-center text-primary font-bold mb-2'><FiList className='mr-2' /> Description :</h3>
                    <span className='font-bold'>{salary.description}</span>
                </div>
            </div>
    );
};

export default SalaryItem;
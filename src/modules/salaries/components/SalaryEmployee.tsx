import { Card } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { FaCalendar, FaCog, FaFolderMinus, FaInfo, FaWallet } from 'react-icons/fa';
import { IMetier, ISalary } from '../../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import useSalary from '../../../hooks/useSalary';
import EditSalaireDrawer from './EditSalaireModal';
import SalaryItem from './SalaryItem';
import useMetier from '../../../hooks/useMetier';
import { showRequestError } from '../../../helpers';
import { FiCheckCircle, FiEdit, FiEdit2, FiInfo } from 'react-icons/fi';

type SalaryEmployeeProps = {
    employeeId : string
}
const SalaryEmployee : FC<SalaryEmployeeProps> = ({employeeId}) => {

    const {getByEmployee} = useSalary()
    const {getAll} = useMetier()
    const [salaries , setSalaries] = useState<ISalary[]>([])
    const [isEditing,setIsEditing] = useState<boolean>(false)
    const [metiers , setMetiers] = useState<IMetier[]>([])
    const refetch = ()=>{
        getByEmployee(employeeId as string || '').then((e)=>{
            setSalaries(e.data)            
        }).catch((err:any)=>{})
    }
    useEffect(()=>{
        getAll().then((e)=>{setMetiers(e.data)})
        .catch((err)=>showRequestError())
        refetch()
    },[])

    return (
        <>
        <Card className='p-2 my-2 text-sm z-0'>
                <div className='flex justify-start items-center mb-2'>
                    <FiInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-sm'>HISTORIQUE SALARIALE ET POSTE</h4>
                </div>
                {
                    metiers.length > 0 ? (
                        <>
                        <div className='flex justify-end items-center py-2'>
                        <button 
                            className='text-sm flex justify-center hover:bg-green-600 items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                            type='submit'
                            onClick={()=>{setIsEditing(!isEditing)}}
                        >
                            <FiEdit /> <span className='ml-1'>modifier salaire</span>
                        </button>
                    </div>
                    { salaries.length > 0 ? (
                        <div className='grid grid-cols-2 gap-3'>
                            {salaries.map((el , index)=>(
                                < SalaryItem index={index} salary={el} />                     
                            ))}
                        </div>
                        ) : (
                            <div className='w-full text-primary p-10'>
                                <div className='flex justify-center text-5xl'>
                                    <FaFolderMinus />
                                </div>
                                <p className='text-center text-xl font-bold py-5'>Le salaire de ce salarié n'a pas encore été configuré , veuiller le configurer.</p>
                            </div>
                        )
                    }
                    </>
                    ) : (
                    <div className='w-full text-primary p-10'>
                        <div className='flex justify-center text-5xl'>
                            <FaCog />
                        </div>
                        <p className='text-center text-xl font-bold py-5'>Veuiller créer de metier dans vôtre entreprise pour pouvoir configurer une salaire.</p>
                    </div>
                )
                }
            </Card>
            {isEditing && <EditSalaireDrawer employeeId={employeeId} close={()=>{setIsEditing(!isEditing);refetch()}}/>}
            </>
    );
};

export default SalaryEmployee;
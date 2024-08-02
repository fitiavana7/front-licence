import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GenreData, MatrimonialeData } from '../../../components/data';
import { InputControlled, SelectControlled } from '../../../components/ui/InputControlled';
import { inputStyles } from '../../../helpers';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee, ISalary } from '../../../types';
import {FaInfo , FaUser , FaLocationArrow , FaMailBulk, FaPhone, FaRing, FaWallet, FaCalendar, FaAdjust } from 'react-icons/fa'
import { Card } from 'antd';
import Button from '../../../components/ui/Button';
import EditSalaireDrawer from '../components/EditSalaireDrawer';
import useSalary from '../../../hooks/useSalary';
const EmployeeDetail = () => {

    const {id} = useParams()

    const {getEmployeeDetails} = useEmployee()
    const {getByEmployee} = useSalary()

    const [employee , setEmployee] = useState<IEmployee>()
    const [salaries , setSalaries] = useState<ISalary[]>([])
    const [isEditing,setIsEditing] = useState<boolean>(false)

    const refetch = ()=>{
        getEmployeeDetails(id as string || '').then((e)=>{
            setEmployee(e.data)
        }).catch((err:any)=>{})
        getByEmployee(id as string || '').then((e)=>{
            setSalaries(e.data)
            console.log(e.data);
            
        }).catch((err:any)=>{})
    }
    useEffect(()=>{
        refetch()
    },[])

    return (
        <div>
            <Card className='p-2 my-2 text-lg'>
                <div className='flex justify-start items-center py-3'>
                    <FaInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-lg'>INFORMATIONS PERSONNELLES</h4>
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Nom</h3>
                        <span className='font-bold'>{employee?.firstName.toLocaleUpperCase()}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Prénom</h3>
                        <span className='font-bold'>{employee?.lastName}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Age</h3>
                        <span className='font-bold'>{employee?.age}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Sexe</h3>
                        <span className='font-bold'>{employee?.gender}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaLocationArrow className='mr-2' /> Adrèsse</h3>
                        <span className='font-bold'>{employee?.adress}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Situation matrimoniale</h3>
                        <span className='font-bold'>{employee?.matrimoniale}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Mail</h3>
                        <span className='font-bold'>{employee?.mail}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaPhone className='mr-2' /> Téléphone</h3>
                        <span className='font-bold'>{employee?.phone}</span>
                    </div>
                </div>
            </Card>
            <Card className='p-2 my-2'>
                <div className='flex justify-start items-center'>
                    <FaInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-lg'>HISTORIQUE SALARIALE</h4>
                </div>
                <div className='flex justify-end items-center py-2'>
                    <Button label='modifier salaire' type='success' onClick={()=>{setIsEditing(!isEditing)}} />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    {
                        salaries.length > 0 ? 
                        salaries.map((el , index)=>(
                            <>
                            <div className={`border text-lg ${index == 0 ? 'border-green-200 bg-green-100' : 'border-primary'} p-2 rounded-md`}>
                                <div className='flex justify-end items-center'>
                                    { index == 0 && <div className='py-1 px-3 mr-2 bg-green-400 rounded-full text-white'>active</div> }                                   
                                    <div className='py-1 px-3 bg-orange-500 rounded-full text-white'>{el.amount} ar</div>
                                </div>
                                <div className='flex justify-between items-center p-1'>
                                    <h3 className='flex items-center text-primary font-bold'><FaWallet className='mr-2' /> Métier</h3>
                                    <span className='font-bold'>{el.workId}</span>
                                </div>
                                <div className='flex justify-between items-center p-1'>
                                    <h3 className='flex items-center text-primary font-bold'><FaCalendar className='mr-2' /> Date du changement</h3>
                                    <span className='font-bold'>{el.applicationDate}</span>
                                </div>
                                <div className='p-1'>
                                    <h3 className='flex items-center text-primary font-bold pb-2'><FaAdjust className='mr-2' /> Description :</h3>
                                    <span className='font-bold'>{el.description}</span>
                                </div>
                            </div>
                            </>                        
                        )) : null
                    }
                </div>
            </Card>
            
            {isEditing && <EditSalaireDrawer employeeId={employee?._id || ''} close={()=>{setIsEditing(!isEditing);refetch()}}/>}
        </div>
    );
};

export default EmployeeDetail;